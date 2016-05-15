var express = require("express");
var bodyParser = require("body-parser");
var governify = require("governify");

var app = module.exports = express();

express.static(__dirname+'/static/sla/')

governify.control(app,{
  datastore: "http://datastore.governify.io/api/v6.1/",
  namespace: "sos2016-06-lbb",
  defaultPath: "/api"
});

app.get("/api/sla", (req,res) =>{
  res.send([
    {name: "leo"},
    {name: "quique"}
  ]);
});

// http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Fleobernal91%2FGovernify-API%2FPlans%2Fportal-config.json
