

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




app.route('/api/v1/olympicsgames/:param')
  .get(controller.getaOlympicGamesbycities)
  .post(function(req,res){
    res.sendStatus(405);
  })
  .put(function(req,res){
    controller.updateOlympicgame(req,req.body,res);
    
  })
  .delete(function(req,res){
    res.sendStatus(405);
  })


app.route('/api/v1/olympicsgames/:city/:year')
  .get(controller.getaOlympicGamesbycitiesandyear)
  .delete(controller.removeOlympic)






  /*app.route('/api/v1/olympicsgames/:city/:year')
  .get(controller.getaOlympicGame)
  .post(function(req,res){
    res.sendStatus(405);
  })
  .put(function(req,res){
    controller.updateOlympicgame(req,req.body,res);
    
  })
  .delete(controller.removeOlympic)
 /* 
test = [{a:1,b:3},{a:2},{c:2}]

app.get ('/prueba', function(req,res){
 
  var control = require("../../queries/index.js")
  control.queries(test,req)

})
 
*/




//LOAD DATA/////
