const express = require("express");
const app = express();
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
//var busca =require("./models/requestTMDB");
//var valor = busca("club");
var porta = process.env.PORT || 8080;
app.listen(porta);
