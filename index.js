var express = require("express");
var app = express();
var fs=require("fs");
var request = require('request');

var cors = require('cors');




//CORS
app.use(cors());

//REQUEST
//PROXY QUIQUE
var paths1='/api/v1/death_penalty_stats';
var apiServerHost1 = 'https://sos-2016-12.herokuapp.com';


app.use(paths1, function(req, res) {
  var url = apiServerHost1 + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url+ req.method);


  req.pipe( request(url,function(error, response, body){

    if (error) {
         console.log(error);
        res.sendStatus(503); // Service Unavailable
    } else {
       console.log("OK");
     }
 })
 ).pipe(res);



});

//proxy for wordbank

var paths2='/countries';
var apiServerHost2 = 'http://api.worldbank.org/';

app.use(paths2, function(req, res) {
  var url = apiServerHost2 + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url+ req.method);


  req.pipe( request(url,function(error, response, body){

    if (error) {
         console.log(error);
        res.sendStatus(503); // Service Unavailable
    } else {
       console.log("OK");
     }
 })
 ).pipe(res);



});


//proxy for wheather

var paths3='/data/2.5/weather';
var apiServerHost3 = 'http://api.openweathermap.org';

app.use(paths3, function(req, res) {
  var url = apiServerHost3 + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url+ req.method);


  req.pipe( request(url,function(error, response, body){

    if (error) {
         console.log(error);
        res.sendStatus(503); // Service Unavailable
    } else {
       console.log("OK");
     }
 })
 ).pipe(res);



});









//PROXY LEO

var paths='/api/v1/music';
var apiServerHost = 'https://sos-2016-08.herokuapp.com';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
 req.pipe( request(url,function(error, response, body){
 if (error) {
         console.log(error);
        res.sendStatus(503); // Service Unavailable
    } else {
       console.log("OK");
     }
 })
 ).pipe(res)
});

// Proxy Group 04
var paths4='/api/v1/population-percentage-by-age';
var apiServerHost4 = 'https://sos-2016-04.herokuapp.com';

app.use(paths4, function(req, res) {
  var url = apiServerHost4 + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
 req.pipe( request(url,function(error, response, body){
 if (error) {
         console.log(error);
        res.sendStatus(503); // Service Unavailable
    } else {
       console.log("OK");
     }
 })
 ).pipe(res)
});


// Api external 1
var paths10='/1.0/population/2015/Spain';
var apiServerHost10 = 'http://api.population.io';

app.use(paths10, function(req, res) {
  var url = apiServerHost10 + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
 req.pipe( request(url,function(error, response, body){
 if (error) {
         console.log(error);
        res.sendStatus(503); // Service Unavailable
    } else {
       console.log("OK");
     }
 })
 ).pipe(res)
});


// Api external 2
var paths20='/rest/v1/currency/eur';
var apiServerHost20 = 'https://restcountries.eu';

app.use(paths20, function(req, res) {
  var url = apiServerHost20 + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
 req.pipe( request(url,function(error, response, body){
 if (error) {
         console.log(error);
        res.sendStatus(503); // Service Unavailable
    } else {
       console.log("OK");
     }
 })
 ).pipe(res)
});

//JSON client

app.use("/clientJSON", express.static(__dirname+'/static/clientJSON.html'));

app.use('/', express.static(__dirname+'/static/'));
//TIME
app.get("/time",(req,res) => {
var date = new Date().toISOString().
  replace(/T/, ' ').
  replace(/\..+/, '');
res.send(date);
});

//RENDER TEMPLATE WITH CONTEXT

app.set('views', __dirname+"/templates");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//TODO REMOVE HTML
app.use("/about", express.static(__dirname+'/static/about.html'));

//*************************************************************************
//************************ F1 Championship (LEO) **************************
//*************************************************************************

app.use("/data/f1championships/RESTClient", express.static(__dirname+'/static/data/f1championships/RESTClient.html'));
app.use("/f1championships", express.static(__dirname+'/static/data/f1championships/gui'));

var seriesleo = require('./lib/api-leo/series');
app.use(seriesleo);

var f1 = require('./lib/api-leo/f1');
app.use(f1);




app.use("/about/f1championship", express.static(__dirname + '/static/f1championship.html'));

app.get("/about/f1championshiprender",(req,res) => {
  var wins=[];
  //read JSON Async
  fs.readFile('f1championship.json','utf8',(err,content) => {
    //ASinc
    wins = JSON.parse(content);
    res.render('f1championship',{
      titulo : "F1 Championship",
      content : wins
    });
  });
});


/////
//////************************Olympics GAmes processes*************************
//****************************************************************************

//own modules

app.use('/olympicsgames', express.static(__dirname+'/static/data/olympicsgamesclient/'));

var symphonies = require('./lib/api-quique/symphonies');

app.use(symphonies);


var olympicsgames = require('./lib/api-quique/olympicsgames');

app.use(olympicsgames);




app.use("/about/olympicsgames", express.static(__dirname+'/static/olympicsgames.html'));



app.get("/about/olympicsgamesrender",(req,res) => {
  var games=[];
  console.log(" Request OlimpicsGames template");


    //read JSON Async
      fs.readFile('olympicsgames.json','utf8',(err,content)=>{
        //ASinc
        console.log("Read data and RENDER");
       games= JSON.parse(content);


        res.render('olympics',{
          titulo : "Olympics",

          content:games

            });

      });


    });






//////

var apimjose = require('./lib/api-mjose/films');
app.use(apimjose)

var basketb = require('./lib/api-mjose/basketball');
app.use(basketb);

app.use("/about/ncaabasketball", express.static(__dirname+'/static/ncaabasketball.html'));

app.get("/about/ncaabasketballrender",(req,res) => {
  var bask=[];
  fs.readFile('ncaabasketball.json','utf8',(err,content) => {
    bask = JSON.parse(content);
    res.render('ncaabasketball',{
      titulo : "Champions of Basketball Division I in NCAA",
      content : bask
    });
  });
});

//*******CHANGE FOR LOCAL TEST*****

//////// PUERTO USADO EN HEROKU /////
var port = (process.env.PORT || 8080)
app.listen(port); /////
/////////////////////////////////////
//SLA
var sla = require('./lib/sla');
app.use(sla);
