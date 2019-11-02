const db = require('../../models');

exports.list = function(req,res) {
    return db.meeting_room.findAll()
    .then((meeting_rooms) => res.json(meeting_rooms))
    .catch((err) => {
        console.log('error querying meeting room list')
        return res.send(err)
    });
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
            return db.meeting_room.create({
                name, description, capacity
            })
            .then((meeting_room) => {
                const pictures = req.body.pictures;
                const meeting_room_id = meeting_room.id;
                for(i=0;i<pictures.length;i++){
                    for(var key in pictures[i]){
                        let url = pictures[i]['url']
                        db.pictures_meeting_room.create({
                            meeting_room_id: meeting_room_id, 
                            url: url
                        });
                    }
                }
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

    db.meeting_room.findByPk(id)
    .then((meeting_room) => {
        const { name, description, capacity } = req.body
        meeting_room.update({ name, description, capacity })
        .catch((err) => {
          console.log('Error updating contact', JSON.stringify(err))
          res.status(400).send(err)
        })
    }).then(() => {
        for(i=0;i<pictures.length;i++){
            for(var key in pictures[i]){
                let url = pictures[i]['url']
                let meeting_room_id = pictures[i]['meeting_room_id']
                let pictures_id = pictures[i]['id']
                db.pictures_meeting_room.findByPk(pictures_id)
                .then((pictures_meeting_room) => {
                    pictures_meeting_room.update({
                        meeting_room_id: meeting_room_id, 
                        url: url
                    });
                })
                .catch((err) => {
                    console.log('Error updating meeting room', JSON.stringify(err))
                    res.status(400).send(err)
                  })
    
            }
        }
    }).then(() => {
        res.status(200).send('OK')
    })
}
exports.delete = function(req,res){
    const id = parseInt(req.params.id)
    return db.meeting_room.findByPk(id)
      .then((meeting_room) => meeting_room.destroy())
      .then(() => res.send({ id }))
      .catch((err) => {
        console.log('Error deleting meeting_room', JSON.stringify(err))
        res.status(400).send(err)
      })
}