var request = require('request');
const https = require('https');

var requisicao = function (queryBusca){
   
    var api ='https://api.themoviedb.org/3/search/movie?api_key=2340fc4617f733779a17fa1db329ea9c&language=en-US&page=1&query=';
    var teste;

    https.get(api+""+queryBusca, (res) => { 
  console.log('statusCode:', res.statusCode);
  

  res.on('data', (d) => { 
   return teste+= process.stdout.write(d);
  });

}).on('error', (e) => { 
  console.error(e);
});
}
module.exports = requisicao;
