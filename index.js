var express = require("express");
var app = express();
var fs=require("fs");


// CallBack Asíncrono
app.get("/",(req,res) => {
var r = '<a href="/about">About Us</a>'

  res.send(r);
});

app.get("/about",(req,res) => {
  var r = "<html><head><h1>sos-2016-06</h1></head>"+
  "<body>"+
  "Leonardo Bernal Bueno <a href='https://es.wikipedia.org/wiki/Campeonato_Mundial_de_Pilotos_de_F%C3%B3rmula_1'>Original data link</a>"+
  "<a href='/about/f1championship'> Data link on Page</a> <br>"+

  "Jose Enrique Ruiz Navarro <a href='https://es.wikipedia.org/wiki/Espa%C3%B1a_en_los_Juegos_Ol%C3%ADmpicos'>Original data link</a>  "+
  "<a href='/about/olympicgames'> Data link on Page </a> <br>"+
  "Maria José Sosa Llorca <a href='http://www.mismarcadores.com/futbol/espana/liga-bbva/'>Original data link</a>"+
  //MJOSE LINK
  "<a href='#'>Data link on Page</a> <br>"


  res.send(r);
});

app.get("/about/f1championship",(req,res) => {
  console.log(" Request f1championship");
  res.send("<html><head><h1>Formula 1 World Championship</h1></head>"+
  "<body>"+
    "<table border='2px'>"+
    "<tr>"+
      "<td><strong>team</strong></td>"+
      "<td><strong>pilot</strong></td>"+
      "<td><strong>year</strong></td>"+
      "<td><strong>country</strong></td>"+
      "<td><strong>wins</strong></td>"+
    "</tr>"+
    "<tr>"+
      "<td>Ferrari</td>"+
      "<td>Michael Schumacher</td>"+
      "<td>2004</td>"+
      "<td>Alemania</td>"+
      "<td>13</td>"+
    "</tr>"+
    "<tr>"+
      "<td>Renault</td>"+
      "<td>Fernando Alonso</td>"+
      "<td>2006</td>"+
      "<td>Spain</td>"+
      "<td>7</td>"+
    "</tr>"+
    "</table>"+
  "</body>"+
  "</html>");

});




app.get("/about/olympicgames",(req,res) => {
  var games=[];
  console.log(" Request OlimpicsGames");
  var r = "<html><head><h1>Olimpics Games</h1></head>"+
  "<body>"+
    "<table border='2px'>"+
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
//close communication
        res.write("</html></body>")
        res.end();
      });
    


  

});














//*******CHANGE FOR LOCAL TEST*****

//////// PUERTO USADO EN HEROKU /////

//app.listen(8080);
app.listen(process.env.PORT); /////
/////////////////////////////////////







