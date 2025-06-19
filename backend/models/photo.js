const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Photo = sequelize.define('Photo', {
  title: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

module.exports = Photo;
