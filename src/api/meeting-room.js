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

    const meeting_rooms_data = db.meeting_room.findAll({
        where: {
            name: name
        }
    }).then((result) => {
        if(result.length != 0){
            return res.status(400).send('meeting room name already exists')
        } else {
            return db.meeting_room.create({
                name, description, capacity,
            })
            .then((meeting_room) => {
                res.send("test "+meeting_room.id)   
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
    return db.meeting_room.findByPk(id)
    .then((meeting_room) => {
      const { name, description, capacity } = req.body
      return db.meeting_room.update({ name, description, capacity })
        .then(() => res.send(meeting_room))
        .catch((err) => {
          console.log('Error updating contact', JSON.stringify(err))
          res.status(400).send(err)
        })
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