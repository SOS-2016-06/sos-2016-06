

var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var controller = require("./controllers.js");







app.use(bodyParser.json())

app.route('/api/v1/olympicsgames/loadInitialData')
  .get(controller.loadInitData)


app.route('/api/v1/olympicsgames')
  .get(controller.getOlympicsGames)
  .post(function(req, res) {
    
    controller.addOlympicgame(req.body,res)})
  .put(function(req,res){
    res.sendStatus(405);
  })
  .delete(controller.removeAll)




app.route('/api/v1/olympicsgames/:city')
  .get(controller.getaOlympicGame)
  .post(function(req,res){
    res.sendStatus(405);
  })
  .put(function(req,res){
    controller.updateOlympicgame(req,req.body,res);
    
  })
  .delete(controller.removeOlympic)
  








//LOAD DATA/////
