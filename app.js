const express = require("express");
const path = require("path");
const app = express();
const request = require('request');
const handlebar = require("express-handlebars");
const bodyParser = require("body-parser");
const Filme = require("./models/Filme");
const user = require("./models/User");

app.use(express.static('public'));
console.log(path.join(__dirname, '/public'));
app.set('public', __dirname + '/public');
app.set('views', path.join(__dirname, '/views'));


const passport = require('passport');


app.use(passport.initialize());

app.use(passport.session());

//Cofiguracoes

app.engine('handlebars', handlebar({
    defaultLatout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Rotas
app.get('/buscarfilmes', function (req, res) {
    res.render("buscarFilmes");
});
app.get('/login', function (req, res) {

    res.render("login");
});
app.post('/login', function (req, res) {
    user.findAll({
        where: {
            email: req.body.email
        }
    }).then(function (result) {

        if (result) {
            res.render("buscarFilmes");
        } else {
            res.render("login");
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
        //res.send(filmes); // Print the HTML for the Google homepage.
    });

})

app.get('/listarfilmes', function (req, res) {
    res.render("listarFilmes");
});
app.post('/addLista', function (req, res) {
    var filmeId = req.body.filmeId;
    var api = 'https://api.themoviedb.org/3/movie/' + filmeId + '?api_key=2340fc4617f733779a17fa1db329ea9c';

    request(api, function (error, response, body) {
        var corpo = JSON.parse(body);

        var filmes = new Filme(corpo);


        //res.render('listarFilmes',{filmes:filmes[0]});  
        //res.send(filmes); // Print the HTML for the Google homepage.
    });

    //https://api.themoviedb.org/3/movie/105789?api_key=2340fc4617f733779a17fa1db329ea9c
    //console.log('add '+req.body.filmeId);
});
app.get('/', function (req, res) {
    res.render("login");


});

var porta = process.env.PORT || 8080;
app.listen(porta);