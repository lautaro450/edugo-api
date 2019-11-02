'use strict';
module.exports = (sequelize, DataTypes) => {
  const meeting_room = sequelize.define('meeting_room', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {});
  meeting_room.associate = function(models) {
  };
  return meeting_room;
};