const db = require('./db')

const User = db.sequelize.define('user', {
    email:{
        type: db.Sequelize.STRING,
        unique: true
    },
    senha:{
        type: db.Sequelize.STRING
    },
    nome:{
        type: db.Sequelize.STRING
    },
    data_de_nascimento:{
        type: db.Sequelize.STRING
    }
} )
//User.sync({force:true})
module.exports = User