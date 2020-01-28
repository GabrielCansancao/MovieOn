const Sequelize = require('sequelize');
var sequelize = new Sequelize('movieon', 'movieonjera', '(movieonjera)', {
    host: 'db4free.net',
    dialect: 'mysql'
  });

  module.exports ={
      Sequelize:Sequelize,
      sequelize:sequelize
  }