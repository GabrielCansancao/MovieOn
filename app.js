const user = require("./models/User");
const Filme = require("./models/Filme");
const objFilme = require("./models/filmedb");
const request = require('request');
const serialize = require('node-serialize');


module.exports = function (app) {

    app.get('/buscarfilmes', function (req, res) {
        res.render("buscarFilmes");
    });
    app.get('/sair', function (req, res) {
        req.session.destroy();
        res.render("home");
    });

    app.get('/login', function (req, res) {

        res.render("login");
    });
    app.get('/home', function (req, res) {

        res.render("home");
    });
    app.get('/minhaLista', function (req, res) {
        var usuarioLogado = req.session.user;

        objFilme.findAll({
            where: {
                email: serialize.unserialize(usuarioLogado).email
            },
            raw: true,
        }).then(function (listaFilmes) {
            var data;
            var tempData = {};
            var i=0;
            for ( var filme in listaFilmes ) {
                tempData[filme] = listaFilmes[i]; 
              i++;
             }
            data = tempData;
            res.render("minhaLista", {
                filmes: data
            });

        });
    });


    app.post('/login', function (req, res) {
        user.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (user) {

            var usuario = {
                email: user.email,
                senha: user.senha,
                nome: user.nome,
                data_de_nascimento: user.data_de_nascimento
            };

            if (user.senha == req.body.senha) {
                
                req.session.user = serialize.serialize(usuario);

                res.render("buscarFilmes");
            } else {
                var mensagem ="email ou senha incorretos";
 
                res.render("login", {mensagem:mensagem});
            }
        });
    });

    app.get('/criarConta', function (req, res) {
        res.render("criarConta");
    });

    app.post('/criarConta', function (req, res) {
        user.create({
            email: req.body.email,
            senha: req.body.senha,
            nome: req.body.nome,
            data_de_nascimento: req.body.data_de_nascimento

        }).then(function () {
            res.render("login");
        }).catch(function (err) {
            res.send("criarConta")
        });
    });

    app.post('/buscarFilmes', function (req, res) {
        var queryBusca = req.body.nomeDoFilme;

        var api = 'https://api.themoviedb.org/3/search/movie?api_key=2340fc4617f733779a17fa1db329ea9c&language=en-US&page=1&query=';

        request(api + "" + queryBusca, function (error, response, body) {
            var corpo = JSON.parse(body);
            var filmes = [];
            for (var results in corpo) {

                var data = corpo[results];
                if (!Number.isInteger(data))
                    filmes.push(new Filme(data));

            }
            res.render('listarFilmes', {
                filmes: filmes[0]
            });
        });

    });

    app.get('/listarfilmes', function (req, res) {
        res.render("listarFilmes");
    });

    app.post('/addLista', function (req, res) {
        var filmeId = req.body.filmeId;
        var api = 'https://api.themoviedb.org/3/movie/' + filmeId + '?api_key=2340fc4617f733779a17fa1db329ea9c';

        request(api, function (error, response, body) {
            var corpo = JSON.parse(body);
            var usuarioLogado = req.session.user;
            var filmes = new Filme(corpo);
            objFilme.findOne({
                where: {
                    email: serialize.unserialize(usuarioLogado).email,
                    idFilmes: filmes.id
                },
                raw: true,
            }).then(function (filme) {
                var mensagem = ""

                if (filme){
                    var mensagem = "filme ja está na lista"
                }
                if(mensagem===""){
                    objFilme.create({
                        popularity: filmes.popularity,
                        vote_count: filmes.vote_count,
                        video: filmes.video,
                        poster_path: filmes.poster_path,
                        idFilmes: filmes.id,
                        adult: filmes.adult,
                        backdrop_path: filmes.backdrop_path,
                        original_language: filmes.original_language,
                        original_title: filmes.original_title,
                        genre_ids: filmes.genre_ids,
                        title: filmes.title,
                        vote_average: filmes.vote_average,
                        overview: filmes.overview,
                        release_date: filmes.release_date,
                        email: serialize.unserialize(usuarioLogado).email
                    })
                }
                
                });
             
               
                res.render('filmePage',{filmes:filmes});

        });
    });
    app.get('/', function (req, res) {
        res.render("home");


    });

};