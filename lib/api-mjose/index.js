var express = require("express");
var app = express();
var port = (process.env.PORT || 8080);
//Importar el fichero musics.js
var fichfilms = require('./films');
var films = [];
var listfilms = [{tittle:"The ring",director:"Gore Verbinski",year:"2002",genre:"terror"},{tittle:"Saw",director:"James Wan",year:"2005",genre:"terror"},{tittle:"Como Dios",director:"Tom Shadyac",year:"2003",genre:"comedy"},{tittle:"Diario de Noa",director:"Nick Cassavetes",year:"2004",genre:"love"}];
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get("/api/sandbox/films",(req,res) => {
res.send(listfilms);
res.send(films);
});
//GET
app.get("/films", (req,res) => {
  var director = req.params.director;
  console.log("New GET of resources " + director);
  res.send(listfilms);
  res.send(films);
  res.sendStatus(404);
});
//POST
app.post("/films", (req,res) => {
  var tittle = req.body.tittle;
  var director = req.body.director;
  var year = req.body.year;
  var genero = req.body.genre;
  var film = [tittle,director,year,genre];
  res.send(listfilms);
  musics.push(film);
  console.log("New POST of resource" + film);
  res.sendStatus(200);
});
//PUT
app.put("/films/:tittle", (req,res) => {
  musics.tittle = req.body.tittle;
  musics.director = req.body.director;
  musics.year = req.body.year;
  musics.genre = req.body.genre;
  res.send(listfilms);
  console.log("New PUT of resource" + musics.tittle);
  res.sendStatus(404);
});
//DELETE
app.delete("/films/:tittle", (req,res) => {
  var tittle = req.params.tittle;
  res.send(listfilms);
  res.remove(films);
  console.log("New DELETE of resource" + musics.tittle);
  res.sendStatus(404);
});
app.listen(port, () => {
  console.log("Ready to go! port " + port);
});
