var express = require("express");
var app = express();
var fs=require("fs");


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

var sla = require('./lib/sla');
app.use(sla);


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
