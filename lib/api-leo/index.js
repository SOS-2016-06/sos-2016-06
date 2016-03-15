var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var fs = require("fs");

app.use(bodyParser.json());

var seriesV=[];

/////////////////// READ JSON /////////////////
app.get("/api-test/series/loadInitialData",(req,res) => {
  //read JSON Async
  fs.readFile('./lib/api-leo/series.json','utf8',(err,content) => {
    //ASinc
    seriesV = JSON.parse(content);
    res.send(seriesV);
  });
});

////////////////////// GET /////////////////////
app.get('/api/sandbox/series',(req,res) => {
  res.send(seriesV);
});

app.get('/api/sandbox/series/:name',(req,res) => {
	var name = req.params.name;
  var s = search(name)
  if( s ==undefined){
    res.send('Error 404: Not found');
  }else{
    res.send(s);
  };
});

/////////////////// DELETE ///////////////////
app.delete('/api/sandbox/series',(req,res) => {
	seriesV.splice(0,seriesV.length);
 	res.send("All Remove");
});

app.delete('/api/sandbox/series/:name',(req,res) => {
	var name = req.params.name;
	var s = search(name)
	if( s ==undefined){
    	res.send('Error 404: Not found');
	}else{
    var index = seriesV.indexOf(s);
    if (index > -1) {
       seriesV.splice(index, 1);
   }
		res.send("DELETE resource "+name)
	}
});

////////////////// POST /////////////////////////////
app.post('/api/sandbox/series',(req,res) => {
 var data_client=req.body[0]
 if(data_client.hasOwnProperty('name') || data_client.hasOwnProperty('genres') || data_client.hasOwnProperty('runtime')){
    seriesV.push(data_client);
    res.send(req.body[0].name+" has been created");
  }else{
  	res.statusCode = 406;
  	res.send("406 Not Acceptable missing parameters");
  }
});

app.post('/api/sandbox/series/:name',(req,res) => {
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");
});

/////////////////// PUT //////////////////////////
app.put('/api/sandbox/series',(req,res) => {
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");
});

app.put('/api/sandbox/series/:name',(req,res) => {
  var name = req.params.name
	var data_client=req.body
  if(data_client.hasOwnProperty('name') || data_client.hasOwnProperty('genres') || data_client.hasOwnProperty('runtime')){
    var s = search(name);
    if( s ==undefined){
      res.send('Error 404: Not found');
    }else{
      for (var i in seriesV) {
         if (seriesV[i].name == name) {
            seriesV[i].name = data_client.name;
            seriesV[i].genres = data_client.genres;
            seriesV[i].runtime = data_client.runtime;
            break;
         };
       };
      res.send(data_client.name+" has been Updated");
    };
  }else{
    res.statusCode = 406;
    res.send("406 Not Acceptable missing parameters");
  };
});

//////////////////////////////////////////////////

function search(name){
  var resultado;
  seriesV.forEach((serie) => {
    if (serie.name == name){
      resultado = serie;
    };
  });
  return resultado;
};
