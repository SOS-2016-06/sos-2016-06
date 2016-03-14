var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var read= require("fs");


app.use(bodyParser.json())





var films=[];

//GET
app.get("/api/sandbox/films/:tittle", (req,res) => {
  var tittle = req.params.tittle;
  console.log("New GET of resources " + tittle);
  res.send(films);
  res.sendStatus(404);
});

app.get("/api/sandbox/films", (req,res) => {
  var tittle = req.params.tittle;
  console.log("New GET of resources " + tittle);
  res.send(films);
  res.sendStatus(404);
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






var fichfilms = require('./fichfilms');
app.get("/api-test/films/loadInitialData",(req,res) => {
  res.send(fichfilms);
  });



// //DELETES
// app.delete('/api/sandbox/films/:composer',function (req,res){
// 	var name = req.params.tittle
//
// 	var searched = searchBycomposer(name)
// 	if(searched==undefined){//notexist
// 		console.log("Resource not found")
// 		res.statusCode = 404;
// 		//res.sendStatus(404);
//     	res.send('Error 404: No symphony found');
// 	}else{
// 		deleteElement(searched);
// 		console.log("DELETE resource "+name+ " from "+req.connection.remoteAddress);
// 		res.send("DELETE resource "+name)//SEARCH CONTACTS
// 	}
// });
//
//
// //WARNINGS
// app.delete('/api/sandbox/films',(req,res)=>{
// 	symphonies.splice(0,symphonies.length)
// 	res.statusCode = 200;
//  	res.send("All Remove");
//
// });
//
//
//
// //PUT
//
//
// app.put('/api/sandbox/films/:tittle',function (req,res){
// 	var name = req.params.tittle
// 	var symphony=req.body[0]
//  	checkvar = checkdataRequest(symphony);
//  //console.log(req.body.composer)
//  //console.log("composer1 "+req.body.hasOwnProperty("composer"))
//  if(checkvar== true){
//  	var searched = searchBycomposer(name)
//  	if(searched==undefined){
// 		console.log("Resource not found")
// 		res.statusCode = 404;
// 		//res.sendStatus(404);
//     	res.send('Error 404: No symphony found');
// 	}else{
// 	updateElement(name,symphony)
// 	console.log("PUT "+name+ " from "+req.connection.remoteAddress);
//  	res.statusCode = 200;
//  	res.send(symphony.tittle+" has been Updated");
// 		//UPDATE
// 	}
//
//
//
//  }else{
//
//  	console.log("PUT failed from "+req.connection.remoteAddress);
//  	res.statusCode = 406;
//  	res.send("406 Not Acceptable missing parameters");
//  }
//
// });
//
// app.put('/api/sandbox/films',(req,res)=>{
// 	res.statusCode = 405;
//  	res.send("405 Method Not Allowed");
//
// });
//
//
//
// //LOAD DATA/////

//
//
//
// });
//
// //FUNCTIONS AUX
//
// function searchBycomposer(comp){
// 	var searched = symphonies.filter(function (content) {
//     	return content.composer.toLowerCase() == comp.toLowerCase();})[0];
// 	return searched;};
//
// function checkdataRequest(request){
//
// 		if(!request.hasOwnProperty('composer') ||!request.hasOwnProperty('duration')
// 		||!request.hasOwnProperty('number')){
// 		return false
//
// 	}else{
// 		return true
// 	}
//
//
// };
// function deleteElement(element){
//  var index = films.indexOf(element);
//  if (index > -1) {
//     films.splice(index, 1);
// }
//
// };
//
// function updateElement(name,element){
//
// 	for (var i in symphonies) {
//
//      if (symphonies[i].tittle.toLowerCase() == name.toLowerCase()) {
//         symphonies[i].composer = element.composer;
//         symphonies[i].duration = element.duration;
//         symphonies[i].number = element.number;
//
//
//         break; //Stop this loop, we found it!
//      }
//    }
//}

// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());
//
//
// //Importar el fichero musics.js
// var fichfilms = require('./films');
// var films = [];
// //var listfilms = [{tittle:"The ring",director:"Gore Verbinski",year:"2002",genre:"terror"},{tittle:"Saw",director:"James Wan",year:"2005",genre:"terror"},{tittle:"Como Dios",director:"Tom Shadyac",year:"2003",genre:"comedy"},{tittle:"Diario de Noa",director:"Nick Cassavetes",year:"2004",genre:"love"}];
//
//
// app.get("/api-test/films/loadInitialData",(req,res) => {
// res.send(fichfilms);
// });
//
// app.get("/api/sandbox/films",(req,res) => {
// res.send(films);
// });
//
//


// //PUT
// app.put("/api/sandbox/films/:tittle", (req,res) => {
//   films.tittle = req.body.tittle;
//   films.director = req.body.director;
//   films.year = req.body.year;
//   films.genre = req.body.genre;
//   console.log("New PUT of resource" + films.tittle);
//   res.sendStatus(404);
// });
// //DELETE
// app.delete("/api/sandbox/films/:tittle", (req,res) => {
//   var tittle = req.params.tittle;
//   res.remove(films);
//   console.log("New DELETE of resource" + films.tittle);
//   res.sendStatus(404);
// });
