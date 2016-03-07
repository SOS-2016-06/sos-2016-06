var express = require("express");
var app = express();
var fs=require("fs");

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


app.get("/",(req,res) => {
var r = '<a href="/about">About Us</a></br>' +
        '<a href="/time">Time</a>'
  res.send(r);
});



//TODO REMOVE HTML
app.use("/about", express.static(__dirname+'/static/about.html'));

//*************************************************************************
//************************ F1 Championship (LEO) **************************
//*************************************************************************

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





app.use("/about/ncaabasketball", express.static(__dirname+'/static/ncaabasketball.html'));


// app.get("/about/ncaabasketball",(req,res) => {
//   var bask=[];
//   console.log(" Request NCAABasketball");
//   var r = "<html><head><h1>Champions of Basketball Division I in NCAA</h1></head>"+
//   "<body>"+
//   "<table border='2px'>"+
//   "This is the results of the champions of Basketball Division I in NCAA from 1939 to 2015:"+
//   "<tr>"+
//   "<td><strong>champion</strong></td>"+
//   "<td><strong>year</strong></td>"+
//   "<td><strong>city</strong></td>"+
//   "<td><strong>runnerup</strong></td>"+
//   "<td><strong>championresults</strong></td>"+
//   "<td><strong>runnerupresults</strong></td>"+
//   "</tr>"
//   res.write(r);
// //read.file
//
//     fs.readFile('ncaabasketball.json','utf8',(err,content)=>{
//     console.log("Read data");
//     bask= JSON.parse(content);
//
//
//
//              bask.forEach((rawGame)=>{
//              res.write(
//              "<tr>"+
//              "<td>"+rawGame.champion+"</td>"+
//              "<td>"+rawGame.year+"</td>"+
//              "<td>"+rawGame.city+"</td>"+
//              "<td>"+rawGame.runnerup+"</td>"+
//              "<td>"+rawGame.championresults+"</td>"+
//              "<td>"+rawGame.runnerupresults+"</td>"+
//              "</tr>");
//
//              });
//    //close communication
//            res.write("</table></body></html>")
//            res.end();
//          });
//
// });






//*******CHANGE FOR LOCAL TEST*****

//////// PUERTO USADO EN HEROKU /////
var port = (process.env.PORT || 8080)
app.listen(port); /////
/////////////////////////////////////
