const Sequelize = require('sequelize');
var sequelize = new Sequelize('movieon', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports ={
      Sequelize:Sequelize,
      sequelize:sequelize
  }