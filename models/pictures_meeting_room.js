'use strict';
module.exports = (sequelize, DataTypes) => {
  const pictures_meeting_room = sequelize.define('pictures_meeting_room', {
    meeting_room_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  pictures_meeting_room.associate = function(models) {
  };
  return pictures_meeting_room;
};