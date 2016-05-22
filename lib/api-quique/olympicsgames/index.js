

var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var controller = require("./controllers.js");
var login = require("../../queries/login");


var governify = require("governify");



//http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Fjoseenriqueruiznavarro%2FGovernify-API%2FPlans%2Fportal-config.json
//sos-2016-06-jern

governify.control(app,{
  datastore: "http://datastore.governify.io/api/v6.1/", 
  namespace: "sos-2016-06-jern",
  defaultPath: "/api/v1/olympicsgames"
});






app.use(bodyParser.json())


app.route('/api/v1/olympicsgames/loadInitialData')
  .get(controller.loadInitData)


app.route('/api/v1/olympicsgames')
  .get(controller.getOlympicsGames)
  .post(function(req, res) {

    controller.addOlympicgame(req.body,res)})
  .put( function(req,res){
    res.sendStatus(405);
  })
  .delete(controller.removeAll)




app.route('/api/v1/olympicsgames/:param')
  .get(controller.getaOlympicGame)
  .post(function(req,res){
    res.sendStatus(405);
  })
  .put(function(req,res){
    res.sendStatus(405);

  })
  .delete(controller.removeSubSet)


app.route('/api/v1/olympicsgames/:city/:year')
  .get(controller.getaOlympicGamesbycitiesandyear)
  .delete(controller.removeOlympic)
  .put(function(req,res){
    controller.updateOlympicgame(req,req.body,res);

  })
  .post(function(req,res){
    res.sendStatus(405);
  })


//app.route('/api/v1/olympicsgames')
//  .get(login.ReadAccess ,controller.getOlympicsGames)
//  .post(login.WriteReadAccess, function(req, res) {

//    controller.addOlympicgame(req.body,res)})
//  .put(login.WriteReadAccess , function(req,res){
//    res.sendStatus(405);
 // })
  //.delete(login.WriteReadAccess ,controller.removeAll)