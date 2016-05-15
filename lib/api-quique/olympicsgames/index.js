

var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var controller = require("./controllers.js");
var login = require("../../queries/login");


var request = require('request');

//PROXY

var paths='/api/v1/divorces-spanish';
var apiServerHost = 'https://sos-2016-10.herokuapp.com';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  //req.pipe(request(url)).pipe(res);

 req.pipe( request(url,function(error, response, body){

    if(error){
      console.log("Any error on connection")

    }
 })
 ).pipe(res)
});







app.use(bodyParser.json())

app.route('/api/v1/olympicsgames/loadInitialData')
  .get(login.WriteReadAccess , controller.loadInitData)


app.route('/api/v1/olympicsgames')
  .get(login.ReadAccess ,controller.getOlympicsGames)
  .post(login.WriteReadAccess, function(req, res) {

    controller.addOlympicgame(req.body,res)})
  .put(login.WriteReadAccess , function(req,res){
    res.sendStatus(405);
  })
  .delete(login.WriteReadAccess ,controller.removeAll)




app.route('/api/v1/olympicsgames/:param')
  .get(login.ReadAccess , controller.getaOlympicGame)
  .post(login.WriteReadAccess , function(req,res){
    res.sendStatus(405);
  })
  .put( login.WriteReadAccess ,function(req,res){
    res.sendStatus(405);

  })
  .delete(login.WriteReadAccess ,controller.removeSubSet)


app.route('/api/v1/olympicsgames/:city/:year')
  .get(login.ReadAccess , controller.getaOlympicGamesbycitiesandyear)
  .delete(login.WriteReadAccess ,controller.removeOlympic)
  .put(login.WriteReadAccess, function(req,res){
    controller.updateOlympicgame(req,req.body,res);

  })
  .post(login.WriteReadAccess ,function(req,res){
    res.sendStatus(405);
  })




