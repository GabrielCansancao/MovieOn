const express = require("express");
const path = require("path");
const session = require('express-session');
const handlebar = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();



//Cofiguracoes

app.engine('handlebars', handlebar({
    defaultLatout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'movieon',
    resave: true,
    saveUninitialized: true
}));


app.use(express.static('public'));
app.set('public', __dirname + '/public');
app.set('views', path.join(__dirname, '/views'));

app.use(function (req, res, next) {
    if (req.path === '/login' || req.path === '/criarConta'|| req.path === '/home') return next();
    if (req.session.user == null&&req.path === '/' ) {
        res.redirect('/home');
    } else if (req.session.user == null ) {
        res.redirect('/login');
    } else {
        next();
    }
});

require('./app')(app);



var porta = process.env.PORT || 8080;
app.listen(porta);
