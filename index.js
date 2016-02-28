var express = require("express");
var app = express();

// CallBack Asíncrono
app.get("/",(req,res) => {
  res.send("Raíz");
});

app.get("/about",(req,res) => {
  res.send("Página de Presentación");
});

app.get("/about/f1championship",(req,res) => {
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

//////// PUERTO USADO EN HEROKU /////
app.listen(process.env.PORT); /////
/////////////////////////////////////

//app.listen(5000); // Descomentar solo para pruebas en local

