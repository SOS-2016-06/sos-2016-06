var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var read= require("fs");
var search = require("../../commons/search");
var update = require("../../commons/update");
var del = require("../../commons/delete");

app.use(bodyParser.json())

var basks=[];

app.get("/api/v1/ncaabasketballs/loadInitialData",(req,res) => {
  var bas = [{champion:"Oregon",year:"1939",city:"Evanston",runnerup:"Ohio State",championresults:"46",runnerupresults:"33"},
    {champion:"Duke",year:"2015",city:"Indianapolis",runnerup:"Wisconsin",championresults:"68",runnerupresults:"63"},
    {champion:"Utah",year:"1944",city:"New York",runnerup:"Dartmouth",championresults:"42",runnerupresults:"40"},
    {champion:"	Oklahoma A&M",year:"1946",city:"New York",runnerup:"North Carolina",championresults:"43",runnerupresults:"40"},
    {champion:"Holy Cross",year:"1947",city:"New York",runnerup:"Oklahoma",championresults:"58",runnerupresults:"47"}];
  res.send(bas);
  });

//GET
//Acceder a todas las estadísticas de una ciudad o año
app.get("/api/v1/ncaabasketballs/:param", (req,res) => {
  var param = req.params.param;
  if(isNaN(param)){
    var s = search.searchByparam(basks,"city",param);
  }else{
    var s = search.searchByparam(basks,"year",param);
  }
  if(s==undefined){
    res.sendStatus(404);
  }else{
    res.send(s);
  };
});

//Acceder a una estadística concreta
app.get('/api/v1/ncaabasketballs/:city/:year',(req,res) => {
	var city = req.params.city;
  var year = req.params.year;
  var s = search.searchBytwoparams(basks,"city","year",city,year);
  if(s==undefined){
    res.sendStatus(404);
  }else{
    res.send(s);
  };
});

//Acceder a todas las estadísticas
app.get("/api/v1/ncaabasketballs", (req,res) => {
  res.send(basks);
});

//POST
//Crear una nueva estadística
app.post("/api/v1/ncaabasketballs", (req,res) => {
  var data=req.body[0]
  var champion = req.body.champion;
  var bas = {champion:req.body.champion, year:req.body.year, city:req.body.city, runnerup:req.body.runnerup, championresults:req.body.championresults, runnerupresults:req.body.runnerupresults};
  basks.push(bas);
  console.log("New POST of resource" + champion);
  res.sendStatus(201);
});

//POST a un recurso. Error 405 Method not allowed
app.post('/api/v1/ncaabasketballs/:city',(req,res)=>{
	res.sendStatus(405);
});

app.post('/api/v1/ncaabasketballs/:year',(req,res)=>{
	res.sendStatus(405);
});

app.post('/api/v1/ncaabasketballs/:city/:year',(req,res) => {
	res.sendStatus(405);
});

//PUT
//Actualizar una estadística
app.put("/api/v1/ncaabasketballs/:city/:year", (req,res) => {
  var city = req.params.city;
  var year = req.params.year;
	var data_client=req.body[0]
  var s = search.searchBytwoparams(basks,"city","year",city,year);
    if(s==undefined){
      res.sendStatus(404);
    }else{
      update.updateFunction(basks,"city","year",city,year,data_client);
      res.sendStatus(200);
    };
});

//PUT al recurso base da un error 405 Method not allowed
app.put('/api/v1/ncaabasketballs',(req,res)=>{
	res.sendStatus(405);

});

//DELETE
//Eliminar un recurso según su ciudad o año
app.delete("/api/v1/ncaabasketballs/:param",(req,res) => {
  var param = req.params.param;
  if(isNaN(param)){
    var s = search.searchByparam(basks,"city",param);
  }else{
    var s = search.searchByparam(basks,"year",param);
  }
	if(s==undefined){
    res.sendStatus(404);
	}else{
    var index = basks.indexOf(s);
    basks.splice(index);
    res.sendStatus(200);
  }
});

app.delete('/api/v1/ncaabasketballs/:city/:year',(req,res) => {
	var city = req.params.city;
  var year = req.params.year;
	var s = search.searchBytwoparams(basks,"city","year",city,year);
	if(s==undefined){
    res.sendStatus(404);
	}else{
    del.deleteElement(basks,s);
    res.sendStatus(200);
  }
});

//Borra todos los elementos
app.delete('/api/v1/ncaabasketballs',(req,res)=>{
//Quita elementos de una matriz, inserta nuevos elementos en su lugar si procede y devuelve los elementos eliminados.
	basks.splice(0,basks.length)
	res.sendStatus(200);

});

function searchByCity(city){
  var res;
  basks.forEach((basket) => {
    if (basket.city == city){
      res = city;
    };
  });
  return res;
};

function searchByYear(year){
  var res;
  basks.forEach((basket) => {
    if (basket.year == year){
      res = year;
    };
  });
  return res;
};
