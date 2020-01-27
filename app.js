const express = require("express");
const app = express();
const request = require('request');
const handlebar = require("express-handlebars");
const bodyParser = require("body-parser");

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
    res.render("listarFilmes");
    
})

app.get('/listarfilmes', function(req,res){
    res.render("listarFilmes");
});
app.get('/', function(req,res){
    var queryBusca ="lala land";
    var api ='https://api.themoviedb.org/3/search/movie?api_key=2340fc4617f733779a17fa1db329ea9c&language=en-US&page=1&query=';

        request(api+""+queryBusca, function (error, response, body) {
          console.error('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          res.send(body); // Print the HTML for the Google homepage.
        });
    
   
    
});
//var busca =require("./models/requestTMDB");
//var valor = busca("club");
var porta = process.env.PORT || 8080;
app.listen(porta);



