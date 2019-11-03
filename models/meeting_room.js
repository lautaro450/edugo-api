'use strict';
module.exports = (sequelize, DataTypes) => {
  const meeting_room = sequelize.define('meeting_room', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {});
  meeting_room.associate = function(models) {
    meeting_room.hasMany(models.pictures_meeting_room, {
      foreignKey: 'meeting_room_id',
      as: 'pictures'
    });
  };
  return meeting_room;
};