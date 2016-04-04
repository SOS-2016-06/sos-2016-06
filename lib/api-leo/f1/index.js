var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var search = require("../../commons/search");
var del = require("../../commons/delete");
var update = require("../../commons/update");
var add = require("../../commons/add");
var login = require("../../queries/login");
var pagination = require("../../queries/pagination");
var searchbyquery = require("../../queries/searchbyparam");

app.use(bodyParser.json());

var f1championshipsV=[];


/////////////////// READ JSON /////////////////
app.get("/api/v1/f1championships/loadInitialData", login.WriteReadAccess, (req,res) => {
  //read JSON Async
  fs.readFile('./lib/api-leo/f1/f1championships.json','utf8',(err,content) => {
    //ASinc
    f1championshipsV = JSON.parse(content);
    res.send(f1championshipsV);
  });
});


////////////////////// GET /////////////////////
app.get('/api/v1/f1championships', login.ReadAccess, (req,res) => {
  var searched  = searchbyquery.searchbyquery(f1championshipsV,req,res,"year");
  conjunt = pagination.pag(searched,req,res);

  if (conjunt === undefined || conjunt.length == 0){
    res.sendStatus(404);
  }else{
    res.send(conjunt);
  }
});

app.get('/api/v1/f1championships/:param', login.ReadAccess, (req,res) => {
  var regex = /^[0-9]{4}/;
	var param = req.params.param;
  if(param.match(regex)){
    var s = search.searchByparam(f1championshipsV,"year",param);
  }else{
    var s = search.searchByparam(f1championshipsV,"country",param);
  }
  if(s = ""){
    res.sendStatus(404);
  }else{
    res.send(s);
  };
});


app.get('/api/v1/f1championships/:country/:year', login.ReadAccess, (req,res) => {
	var country = req.params.country;
  var year = req.params.year;
  var s = search.searchBytwoparams(f1championshipsV,"country","year",country,year);

  if( s == undefined){
    res.sendStatus(404);
  }else{
    res.send(s);
  };
});


/////////////////// DELETE ///////////////////
app.delete('/api/v1/f1championships', login.WriteReadAccess, (req,res) => {
  del.deleteAll(f1championshipsV);
  res.sendStatus(200);
});

app.delete('/api/v1/f1championships/:country/:year', login.WriteReadAccess, (req,res) => {
	var country = req.params.country;
  var year = req.params.year;
	var s = search.searchBytwoparams(f1championshipsV,"country","year",country,year);
	if( s == undefined){
    res.sendStatus(404);
	}else{
    del.deleteElement(f1championshipsV,s);
    res.sendStatus(200);
  }
});

app.delete('/api/v1/f1championships/:param', login.WriteReadAccess, (req,res) => {
  var regex = /^[0-9]{4}/;
	var param = req.params.param;
  if(param.match(regex)){
    var s = search.searchByparam(f1championshipsV,"year",param);
    del.deleteElementSub(f1championshipsV,s);
    res.sendStatus(200);
  }else{
    var s = search.searchByparam(f1championshipsV,"country",param);
    if( s == ""){
      res.sendStatus(404);
  	}else{
      del.deleteElementSub(f1championshipsV,s);
      res.sendStatus(200);
    }
  }
});


////////////////// POST /////////////////////////////
app.post('/api/v1/f1championships', login.WriteReadAccess, (req,res) => {
 var datas=req.body[0]
 if(datas.hasOwnProperty('motor') && datas.hasOwnProperty('year') && datas.hasOwnProperty('pilot')
    && datas.hasOwnProperty('country') && datas.hasOwnProperty('wins')){
      var result = searchPOST(datas.motor,datas.year,datas.pilot,datas.country,datas.wins);
      if(result == undefined){
        add.addElementToarr(f1championshipsV,datas);
        res.sendStatus(201);
      }else{
        res.sendStatus(409);
      }
  }else{
    res.sendStatus(400);
  }
});

app.post('/api/v1/f1championships/:country', login.WriteReadAccess, (req,res) => {
	res.sendStatus(405);
});

app.post('/api/v1/f1championships/:country/:year', login.WriteReadAccess, (req,res) => {
	res.sendStatus(405);
});


/////////////////// PUT //////////////////////////
app.put('/api/v1/f1championships', login.WriteReadAccess, (req,res) => {
	res.sendStatus(405);
});

app.put('/api/v1/f1championships/:country/:year', login.WriteReadAccess, (req,res) => {
  var country = req.params.country;
  var year = req.params.year;
	var datas=req.body[0];

  var s = search.searchBytwoparams(f1championshipsV,"country","year",country,year);

  if( s == undefined){
    res.sendStatus(404);
  }else{
    if(datas.hasOwnProperty('motor') && datas.hasOwnProperty('year') && datas.hasOwnProperty('pilot')
       && datas.hasOwnProperty('country') && datas.hasOwnProperty('wins')
       && (datas.country == country) && (datas.year == year)){
         update.updateFunction(f1championshipsV,"country","year",country,year,datas)
         res.sendStatus(200);
       }else{
         res.sendStatus(400);
       };
  }
});


//////////////////////////////////////////////////

function searchPOST(motor,year,pilot,country,wins){
  var resultado;
  f1championshipsV.forEach((f1championships) => {
    if (f1championships.motor == motor && f1championships.year == year && f1championships.pilot == pilot
    && f1championships.country == country && f1championships.wins == wins){
      resultado = f1championships;
    };
  });
  return resultado;
}
