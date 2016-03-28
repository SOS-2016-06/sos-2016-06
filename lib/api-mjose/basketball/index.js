var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var read= require("fs");

app.use(bodyParser.json())

var basks=[];

app.get("/api/v1/ncaabasketballs/loadInitialData",(req,res) => {
  var bas = [{champion:"Oregon",year:"1939",city:"Evanston",runnerup:"Ohio State",championresults:"46",runnerupresults:"33"},
    {champion:"Duke",year:"2015",city:"Indianapolis",runnerup:"Wisconsin",championresults:"68",runnerupresults:"63"},
    {champion:"Utah",year:"1944",city:"New York",runnerup:"Dartmouth",championresults:"42",runnerupresults:"40"},
    {champion:"	Oklahoma A&M",year:"1946",city:"New York",runnerup:"North Carolina",championresults:"43",runnerupresults:"40"},
    {champion:"Holy Cross",year:"1947",city:"New York",runnerup:"Oklahoma",championresults:"58",runnerupresults:"47"}];
  res.send(bas);
  });

//GET
app.get("/api/v1/ncaabasketballs/:champion", (req,res) => {
  var champion = req.params.champion;
  var s = search(champion)
  if(s==undefined){
    res.statusCode = 404;
    res.send('Error 404: Not found');
  }else{
    res.send(s);
  };
});

app.get("/api/v1/ncaabasketballs", (req,res) => {
  var champion = req.params.champion;
  console.log("New GET of resources " + champion);
  res.send(basks);
});

//POST
app.post("/api/v1/ncaabasketballs", (req,res) => {
  var data=req.body[0]
  var champion = req.body.champion;
  var bas = {champion:req.body.champion, year:req.body.year, city:req.body.city, runnerup:req.body.runnerup, championresults:req.body.championresults, runnerupresults:req.body.runnerupresults};
  basks.push(bas);
  console.log("New POST of resource" + champion);
  res.statusCode=201;
  res.send("201 CREATED");
});

app.post('/api/v1/ncaabasketballs/:champion',(req,res)=>{
	console.log("POST failed");
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");
});

//PUT
app.put("/api/v1/ncaabasketballs/:champion", (req,res) => {
  var champion = req.params.champion;
	var data_client=req.body[0]
  var s = search(champion);
    if(s==undefined){
      res.statusCode = 404;
      res.send('Error 404: Not found');
    }else{
      for (var i in basks) {
         if (basks[i].champion == champion) {
            basks[i].champion = data_client.champion;
            basks[i].year = data_client.year;
            basks[i].city = data_client.city;
            basks[i].runnerup = data_client.runnerup;
            basks[i].championresults = data_client.championresults;
            basks[i].runnerupresults = data_client.runnerupresults;
            break;
         };
       };
      res.send(data_client.champion+" has been Updated");
    };
});

app.put('/api/v1/ncaabasketballs',(req,res)=>{
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");

});

//DELETE
app.delete("/api/v1/ncaabasketballs/:champion",(req,res) => {
	var champion = req.params.champion;
	var s = search(champion)
	if( s == ""){
    res.statusCode = 404;
    res.send('Error 404: Not found');
	}else{
    basks.forEach((c) => {
      var index = basks.indexOf(c);
      if (index > -1) {
        basks.splice(index, 1);
      }
    });
    res.statusCode = 200;
    res.send("200 OK. DELETE resource " + champion)
  }
});
// app.delete("/api/v1/ncaabasketballs/:champion", (req,res) => {
//   var champion = req.params.champion;
// 	var s = search(champion);
// 	if(s==undefined){
//       res.statusCode=404;
//     	res.send('Error 404: Not found');
// 	}else{
//     var index = basks.indexOf(s);
//     if (index > -1) {
//        basks.splice(index, 1);
//    }
// 		res.send("DELETE resource " + champion);
// 	}
// });

app.delete('/api/v1/ncaabasketballs',(req,res)=>{
//Quita elementos de una matriz, inserta nuevos elementos en su lugar si procede y devuelve los elementos eliminados.
	basks.splice(0,basks.length)
	res.statusCode = 200;
 	res.send("All Remove");

});

function search(champion){
  var res;
  basks.forEach((basket) => {
    if (basket.champion == champion){
      res = champion;
    };
  });
  return res;
};
