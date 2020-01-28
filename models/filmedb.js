const db = require('./db');
const filmedb = db.sequelize.define('filme', {
    popularity: {
        type: db.Sequelize.STRING,
    },
    vote_count: {
        type: db.Sequelize.STRING,
    },
    video: {
        type: db.Sequelize.STRING,
    },
    poster_path: {
        type: db.Sequelize.STRING,
    },
    idFilmes: {
        type: db.Sequelize.STRING,
    },
    adult: {
        type: db.Sequelize.STRING,
    },
    backdrop_path: {
        type: db.Sequelize.STRING,
    },
    original_language: {
        type: db.Sequelize.STRING,
    },
    original_title: {
        type: db.Sequelize.STRING,
    },
    genre_ids: {
        type: db.Sequelize.STRING,
    },
    title: {
        type: db.Sequelize.STRING,
    },
    vote_average: {
        type: db.Sequelize.STRING,
    },
    overview: {
        type: db.Sequelize.STRING,
    },
    release_date: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING
    }
})
//filmedb.sync({force:true})

module.exports = filmedb