var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var read= require("fs");

app.use(bodyParser.json())

var films=[];

//GET
app.get("/api/sandbox/films/:tittle", (req,res) => {
  var tittle = req.params.tittle;
  var s = search(tittle)
  if(s==undefined){
    res.send('Error 404: Not found');
  }else{
    res.send(s);
  };
});

app.get("/api/sandbox/films", (req,res) => {
  var tittle = req.params.tittle;
  console.log("New GET of resources " + tittle);
  res.send(films);
});

//POST
app.post("/api/sandbox/films", (req,res) => {
  var data=req.body[0]
  var tittle = req.body.tittle;
  var film = {tittle:req.body.tittle, director:req.body.director, year:req.body.year, genre:req.body.genre};
  films.push(film);
  console.log("New POST of resource" + tittle);
  res.sendStatus(200);
});

app.post('/api/sandbox/films/:tittle',(req,res)=>{
	console.log("POST failed");
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");
});

//PUT
app.put("/api/sandbox/films/:tittle", (req,res) => {
  var tittle = req.params.tittle
	var data_client=req.body[0]
  var s = search(tittle);
    if(s==undefined){
      res.statusCode = 404;
      res.send('Error 404: Not found');
    }else{
      for (var i in films) {
         if (films[i].tittle == tittle) {
            films[i].tittle = data_client.tittle;
            films[i].director = data_client.director;
            films[i].year = data_client.year;
            films[i].genre = data_client.genre;
            break;
         };
       };
      res.send(data_client.tittle+" has been Updated");
    };
});

app.put('/api/sandbox/films',(req,res)=>{
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");

});

//DELETE
app.delete("/api/sandbox/films/:tittle", (req,res) => {
  var tittle = req.params.tittle;
	var s = search(tittle)
	if( s ==undefined){
    	res.send('Error 404: Not found');
	}else{
    var index = films.indexOf(s);
    if (index > -1) {
       films.splice(index, 1);
   }
		res.send("DELETE resource "+tittle)
	}
});

app.delete('/api/sandbox/films',(req,res)=>{
//Quita elementos de una matriz, inserta nuevos elementos en su lugar si procede y devuelve los elementos eliminados.
	films.splice(0,films.length)
	res.statusCode = 200;
 	res.send("All Remove");

});

app.get("/api-test/films/loadInitialData",(req,res) => {
  var films = require('./fichfilms');
  res.send(films);
  });



function search(tittle){
  var res;
  films.forEach((film) => {
    if (film.tittle == tittle){
      res = film;
    };
  });
  return res;
};
