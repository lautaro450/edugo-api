const db = require('../../models');
const pictures_meeting_room_model = require('../../models').pictures_meeting_room;
const appointments_meeting_room_model = require('../../models').appointment_meeting_room;
exports.list = function(req,res) {
    return db.meeting_room
      .findAll({
        include: [{
          model: pictures_meeting_room_model,
          as: 'pictures'
        },
    {
        model: appointments_meeting_room_model,
        as: 'appointments'
    }],
      })
      .then((meeting_rooms) => {return res.status(200).send(meeting_rooms)})
      .catch((error) => { return res.status(400).send(error); });
}
exports.create = function(req,res) {
    const { user_id, meeting_room_id, meeting_title, meeting_description, date } = req.body

    if(user_id == null || meeting_room_id == null || meeting_title == null || meeting_description == null | date == null) {
        return res.status(400).send('some values are null')
    }
    // checking time slot
    date_hour = date.split(" ")[1];
    date_hour_minutes = date_hour.split(":")[1];
    console.log("date:", date_hour_minutes);
    if(!((date_hour_minutes == 30) || (date_hour_minutes == 00)))
    {
        return res.status(400).send("time slot not allowed");
    }
    // checking if meeting_room_name already exists, then it can't be created
    db.appointment_meeting_room.findAll({
        where: {
            date: date
        }
    }).then((result) => {
        if(result.length != 0){
            return res.status(400).send('meeting room has already been booked in that slot')
        } else {
            return db.appointment_meeting_room.create({
                user_id: user_id,
                meeting_room_id: meeting_room_id,
                meeting_title: meeting_title,
                meeting_description: meeting_description,
                date: date,

            })
            .then((appointment) => {
                return res.status(201).send(appointment)
            })
            .catch((err) => {
                console.log('error trying to add new appointment: ', JSON.stringify(meeting_room))
                return res.status(400).send(err)
            });
        }

    });

}
exports.delete = function(req,res){
    const id = parseInt(req.params.id);
    if(Number.isInteger(id) == false) {
        return res.status(400).send('id should be integer');
    }
    return db.appointment_meeting_room.findByPk(id)
      .then((appointment) => {
          if(!appointment) {
              return res.status(400).send('appointment not found')
          }
          //I should check that the user who wants to delete the appointment is the user who did
          // the appointment but i didn't
          appointment.destroy()
        })
      .then(() => res.send({ id }))
      .catch((err) => {
        console.log('Error cancelling appointment', JSON.stringify(err))
        return res.status(400).send(err)
      })
}