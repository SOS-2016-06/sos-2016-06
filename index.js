var express = require("express");
var app = express();
var fs=require("fs");


app.get("/",(req,res) => {
var r = '<a href="/about">About Us</a>'

  res.send(r);
});

app.get("/about",(req,res) => {
  var r = "<html><head><h1>sos-2016-06</h1></head>"+
  "<body>"+
  "Welcome to our proyect! We are the group number 6 in the SOS proyect. We are working about the sports. <br/>We are:<br/><br/>"+
  "- Leonardo Bernal Bueno: f1championship <a href='https://es.wikipedia.org/wiki/Campeonato_Mundial_de_Pilotos_de_F%C3%B3rmula_1'> Original data link </a>"+
  "<a href='/about/f1championship'> Data link on Page</a> <br>"+

  "- Jose Enrique Ruiz Navarro: olympicgames <a href='https://es.wikipedia.org/wiki/Espa%C3%B1a_en_los_Juegos_Ol%C3%ADmpicos'> Original data link </a>  "+
  "<a href='/about/olympicgames'> Data link on Page </a> <br>"+
  "- Maria José Sosa Llorca: bbvafootball <a href='http://www.mismarcadores.com/futbol/espana/liga-bbva/'> Original data link </a>"+
  //MJOSE LINK
  "<a href='/about/bbvafootball'>Data link on Page</a> <br>"


  res.send(r);
});

app.get("/about/f1championship",(req,res) => {
  var wins = [];
  console.log(" Request f1championship");
  var r = "<html><head><h1>Olimpics Games</h1></head>"+
  "<body>"+
  "This is the results to the Formula 1 Championship in the last years:"+
    "<table border='2px'>"+
    "<tr>"+
      "<td><strong>team</strong></td>"+
      "<td><strong>year</strong></td>"+
      "<td><strong>pilot</strong></td>"+
      "<td><strong>country</strong></td>"+
      "<td><strong>wins</strong></td>"+
    "</tr>"
  //write table head
  res.write(r);
    //read JSON Async
      fs.readFile('f1championship.json','utf8',(err,content)=>{
        //ASinc
        console.log("Read data");
        wins = JSON.parse(content);

       //write each data on table
        wins.forEach((rawWins)=>{
          res.write(
          "<tr>"+
          "<td>"+rawWins.team+"</td>"+
          "<td>"+rawWins.year+"</td>"+
          "<td>"+rawWins.pilot+"</td>"+
          "<td>"+rawWins.country+"</td>"+
          "<td>"+rawWins.wins+"</td>"+
          "</tr>");
          });
//close communication
        res.write("</table></body></html>")
        res.end();
      });
});




app.get("/about/olympicgames",(req,res) => {
  var games=[];
  console.log(" Request OlimpicsGames");
  var r = "<html><head><h1>Olimpics Games</h1></head>"+
  "<body>"+
    "<table border='2px'>"+
    "This is the results to the Olympic Games:"+
    "<tr>"+
      "<td><strong>city</strong></td>"+
      "<td><strong>year</strong></td>"+
      "<td><strong>sports</strong></td>"+
      "<td><strong>athletes</strong></td>"+
      "<td><strong>modality</strong></td>"+
    "</tr>"
  //write table head
  res.write(r);
    //read JSON Async
      fs.readFile('olimpicgames.json','utf8',(err,content)=>{
        //ASinc
        console.log("Read data");
       games= JSON.parse(content);



       //write each data on table
        games.forEach((rawGame)=>{
          res.write(
          "<tr>"+
          "<td>"+rawGame.city+"</td>"+
          "<td>"+rawGame.year+"</td>"+
          "<td>"+rawGame.sportsnumber+"</td>"+
          "<td>"+rawGame.athletes+"</td>"+
          "<td>"+rawGame.modality+"</td>"+
          "</tr>");

          });
        res.write("</table></body></html>")
        res.end();
      });
    });


app.get("/about/ncaabasketball",(req,res) => {
  var bask=[];
  console.log(" Request NCAABasketball");
  var r = "<html><head><h1>Champions of Basketball Division I in NCAA</h1></head>"+
  "<body>"+
  "<table border='2px'>"+
  "This is the results of the champions of Basketball Division I in NCAA from 1939 to 2015:"+
  "<tr>"+
  "<td><strong>champion</strong></td>"+
  "<td><strong>year</strong></td>"+
  "<td><strong>city</strong></td>"+
  "<td><strong>runnerup</strong></td>"+
  "<td><strong>championresults</strong></td>"+
  "<td><strong>runnerupresults</strong></td>"+
  "</tr>"
  res.write(r);
//read.file

    fs.readFile('ncaabasketball.json','utf8',(err,content)=>{
    console.log("Read data");
    bask= JSON.parse(content);



             bask.forEach((rawGame)=>{
             res.write(
             "<tr>"+
             "<td>"+rawGame.champion+"</td>"+
             "<td>"+rawGame.year+"</td>"+
             "<td>"+rawGame.city+"</td>"+
             "<td>"+rawGame.runnerup+"</td>"+
             "<td>"+rawGame.championresults+"</td>"+
             "<td>"+rawGame.runnerupresults+"</td>"+
             "</tr>");

             });
   //close communication
           res.write("</table></body></html>")
           res.end();
         });

});






//*******CHANGE FOR LOCAL TEST*****

//////// PUERTO USADO EN HEROKU /////

app.listen(8080);
//app.listen(process.env.PORT); /////
/////////////////////////////////////
