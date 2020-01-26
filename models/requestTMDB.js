var request = require('request');

var requisicao = function (queryBusca){
    var api ='https://api.themoviedb.org/3/search/movie?api_key=2340fc4617f733779a17fa1db329ea9c&query=';
    var request = require('request');


return request(api+''+queryBusca, function (error, response, body) {
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  var parsedMessage = JSON.parse(body);
  console.log(parsedMessage); 
}); 
}
module.exports = requisicao;
