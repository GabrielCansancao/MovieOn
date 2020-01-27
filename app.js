const express = require("express");
const app = express();
const request = require('request');
const handlebar = require("express-handlebars");
const bodyParser = require("body-parser");
const Filme = require("./models/Filme")

//Cofiguracoes

app.engine('handlebars',handlebar({defaultLatout:'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get('/buscarfilmes', function(req,res){
    res.render("buscarFilmes");
});

app.post('/buscarFilmes', function(req, res){
    var queryBusca =req.body.nomeDoFilme;
   
    var api ='https://api.themoviedb.org/3/search/movie?api_key=2340fc4617f733779a17fa1db329ea9c&language=en-US&page=1&query=';

        request(api+""+queryBusca, function (error, response, body) {
            var corpo = JSON.parse(body);
            var filmes = [];
            for(var results in corpo){
                 
                var data = corpo[results];
                if (!Number.isInteger(data))
                filmes.push(new Filme(data));
                
            }
          res.render('listarFilmes',{filmes:filmes[0]});  
          //res.send(filmes); // Print the HTML for the Google homepage.
        });
    
})

app.get('/listarfilmes', function(req,res){
    res.render("listarFilmes");
});
app.get('/', function(req,res){
    var queryBusca ="lala land";
    var api ='https://api.themoviedb.org/3/search/movie?api_key=2340fc4617f733779a17fa1db329ea9c&language=en-US&page=1&query=';

        request(api+""+queryBusca, function (error, response, body) {
            var corpo = JSON.parse(body);
            var filmes = [];
            for(var results in corpo){
                 
                var data = corpo[results];
                if (!Number.isInteger(data))
                filmes.push(new Filme(data));
                
            }
          res.render('listarFilmes',{filmes:filmes[0]});  
          //res.send(filmes); // Print the HTML for the Google homepage.
        });
    
   
    
});
//var busca =require("./models/requestTMDB");
//var valor = busca("club");
var porta = process.env.PORT || 8080;
app.listen(porta);



