'use strict';
module.exports = (sequelize, DataTypes) => {
  const pictures_meeting_room = sequelize.define('pictures_meeting_room', {
    meeting_room_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  pictures_meeting_room.associate = function(models) {
    pictures_meeting_room.belongsTo(models.meeting_room, {
      foreignKey: 'meeting_room_id'
    });
  };
  return pictures_meeting_room;
};