var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var read= require("fs");


app.use(bodyParser.json())


//FALTA: GET, DELETE y PUT de uno


var films=[];

//GET
app.get("/api/sandbox/films/:tittle", (req,res) => {
  var tittle = req.params.tittle;
  if (tittle == undefined){
        res.statusCode = 404;
        res.send('Error 404: Film not found');
    }else{
        for (var i in films) {
          if(films[i].tittle==tittle){
            res.send(i);
          }
    }
  }
});

app.get("/api/sandbox/films", (req,res) => {
  var tittle = req.params.tittle;
  console.log("New GET of resources " + tittle);
  res.send(films);
});


//POST
app.post("/api/sandbox/films", (req,res) => {
  var tittle = req.body.tittle;
  var director = req.body.director;
  var year = req.body.year;
  var genre = req.body.genre;
  var film = [tittle,director,year,genre];
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
  films.tittle = req.body.tittle;
  films.director = req.body.director;
  films.year = req.body.year;
  films.genre = req.body.genre;
  console.log("New PUT of resource" + films.tittle);
  res.sendStatus(404);
});

app.put('/api/sandbox/films',(req,res)=>{
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");

});

//DELETE
app.delete("/api/sandbox/films/:tittle", (req,res) => {
  for (i=0;i<films.length-1;i++){
  var tittle = req.body.tittle;
  if (tittle == req.params.tittle){
  delete(films[i]);
}
}
  console.log("New DELETE of resource" + films.tittle);
  res.statusCode = 404;
  res.send('Error 404: Films not found');
});

app.delete('/api/sandbox/films',(req,res)=>{
	films.splice(0,films.length)
	res.statusCode = 200;
 	res.send("All Remove");

});

var fichfilms = require('./fichfilms');
app.get("/api-test/films/loadInitialData",(req,res) => {
  res.send(fichfilms);
  });
