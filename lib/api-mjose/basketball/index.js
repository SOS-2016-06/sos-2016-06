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
  var data=req.body[0];
  var bas = {champion:req.body.champion, year:req.body.year, city:req.body.city, runnerup:req.body.runnerup, championresults:req.body.championresults, runnerupresults:req.body.runnerupresults};
  if((isNaN(req.body.year))||(isNaN(req.body.runnerupresults))||(isNaN(req.body.championresults))){
      res.sendStatus(409);
  }else if((req.body.champion=="")||(req.body.year=="")||(req.body.city=="")||(req.body.runnerup=="")
  ||(req.body.championresults=="")||(req.body.runnerupresults=="")){
      res.sendStatus(400);
    }else{
    basks.push(bas);
    res.sendStatus(201);
};
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
	var data_client=req.body[0];
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

function searchPOST(champion,year,city,runnerup,championresults,runnerupresults){
  var resultado;
  basks.forEach((bas) => {
    if (bas.champion == champion && bas.year == year && bas.city == city && bas.runnerup == runnerup
    && bas.championresults == championresults && bas.runnerupresults == runnerupresults){
      resultado = bas;
    };
  });
  return resultado;
}
