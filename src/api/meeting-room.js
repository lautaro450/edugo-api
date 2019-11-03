const db = require('../../models');
const sequelize = require('../../models').sequelize
const pictures_meeting_room_model = require('../../models').pictures_meeting_room;
exports.list = function(req,res) {
    return db.meeting_room
      .findAll({
        include: [{
          model: pictures_meeting_room_model,
          as: 'pictures'
        }],
      })
      .then((meeting_rooms) => {return res.status(200).send(meeting_rooms)})
      .catch((error) => { return res.status(400).send(error); });
}
exports.create = function(req,res) {
    const { name, description, capacity } = req.body

    if(name == null || description == null || capacity == null) {
        return res.status(400).send('name,description or capacity are null')
    }
    // checking if meeting_room_name already exists, then it can't be created
    const meeting_rooms_data = db.meeting_room.findAll({
        where: {
            name: name
        }
    }).then((result) => {
        if(result.length != 0){
            return res.status(400).send('meeting room name already exists')
        } else {
            const pictures = req.body.pictures;
            if (pictures == null) {
                pictures = {'url': ''}
            }
            return db.meeting_room.create({
                name: name,
                description: description,
                capacity: capacity,
                pictures: pictures,

            }, {
                include: [{
                    model: pictures_meeting_room_model,
                    as: 'pictures'
                }]
            })
            .then((meeting_room) => {
                return res.status(201).send(meeting_room)
            })
            .catch((err) => {
                console.log('error trying to add new meeting room: ', JSON.stringify(meeting_room))
                return res.status(400).send(err)
            });
        }

    });

}
exports.update = function(req,res) {
    const id = parseInt(req.params.id)
    const pictures = req.body.pictures;
    if(Number.isInteger(id) == false)
    {
        return res.status(400).send('id parameter should be an integer')
    }


    db.meeting_room.findByPk(id)
    .then((meeting_room) => {
        const { name, description, capacity } = req.body
        meeting_room.update({ name, description, capacity })
        .catch((err) => {
          console.log('Error updating contact', JSON.stringify(err))
          return res.status(400).send(err)
        })
    }).then(() => {
        if(pictures) {
            for(i=0;i< Object.keys(pictures).length;i++){
                    let url = pictures[i]['url']
                    let meeting_room_id = pictures[i]['meeting_room_id']
                    let pictures_id = pictures[i]['id']
                    if(Number.isInteger(pictures_id) == false)
                    {
                        return res.status(400).send('picture id is not an integer (or null)')
                    }
                    db.pictures_meeting_room
                    .findOrCreate({where: {id: pictures_id}, defaults: {url: url, meeting_room_id: meeting_room_id}})
                    .spread(function(picturesResult, created) {
                        if(created == false) {
                            db.pictures_meeting_room.update({
                                meeting_room_id: meeting_room_id,
                                url: url
                            },
                            {
                                where: {id: pictures_id}
                            })
                            .catch((err) => {
                                res.status(400).send(err);
                            })
                        }
                      console.log(picturesResult.get({
                        plain: true
                      }))
                      console.log(created)
                    })
            }
        }

    })
}
exports.delete = function(req,res){
    const id = req.params.id;
    if(Number.isInteger(id) == false) {
        return res.status(400).send('id should be integer');
    }
    return db.meeting_room.findByPk(id)
      .then((meeting_room) => {
          if(!meeting_room) {
              return res.status(400).send('meeting room not found')
          }
          meeting_room.destroy()
        })
      .then(() => res.send({ id }))
      .catch((err) => {
        console.log('Error deleting meeting_room', JSON.stringify(err))
        return res.status(400).send(err)
      })
}