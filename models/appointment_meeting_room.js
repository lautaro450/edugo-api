'use strict';
module.exports = (sequelize, DataTypes) => {
  const appointment_meeting_room = sequelize.define('appointment_meeting_room', {
    user_id: DataTypes.INTEGER,
    meeting_room_id: DataTypes.INTEGER,
    meeting_title: DataTypes.STRING,
    meeting_description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  appointment_meeting_room.associate = function(models) {
    appointment_meeting_room.belongsTo(models.meeting_room, {
      foreignKey: 'meeting_room_id'
    });
  };
  return appointment_meeting_room;
};