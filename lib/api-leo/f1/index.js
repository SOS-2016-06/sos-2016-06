var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var fs = require('fs');
//var paginate = require('express-paginate');

app.use(bodyParser.json());
//app.use(paginate.middleware(10, 50));

var f1championshipsV=[];


/////////////////// READ JSON /////////////////
app.get("/api/v1/f1championships/loadInitialData",(req,res) => {
  //read JSON Async
  fs.readFile('./lib/api-leo/f1/f1championships.json','utf8',(err,content) => {
    //ASinc
    f1championshipsV = JSON.parse(content);
    res.send(f1championshipsV);
  });
});


////////////////////// GET /////////////////////
app.get('/api/v1/f1championships',(req,res) => {
//  var query = req.query;
//  var listKey = Object.keys(query);
//  var res;
/* ///////////////// SEARCH ///////////////////
  if(listKey.length != 0){
    var filter = f1championshipsV.filter((f1) => {
      for (var element in query){
        console.log(query.element);
        if(query.e != f1.element){
          res = false;
        }
      }
      res = f1;
    });
  }
////////////////////////////////////////////// */
/* ////////////////// PAGINATION ///////////////
var limit;
var offset;
if(req.query.limit){
  limit = req.query.limit;
}else{
  limit = 10;
}

if(req.query.offset){
  offset = req.query.offset - 1;
}else{
  offset = 0;
}

///////////////////////////////////////////// */
  res.statusCode = 200;
  res.send(f1championshipsV);
});


app.get('/api/v1/f1championships/:motor',(req,res) => {
	var motor = req.params.motor;
  var s = search(motor)
  if( s == ""){
    res.statusCode = 404;
    res.send('Error 404: Not found');
  }else{
    res.statusCode = 200;
    res.send(s);
  };
});


/////////////////// DELETE ///////////////////
app.delete('/api/v1/f1championships',(req,res) => {
	f1championshipsV.splice(0,f1championshipsV.length);
  res.statusCode = 200;
 	res.send("200 OK. All Remove");
});

app.delete('/api/v1/f1championships/:motor',(req,res) => {
	var motor = req.params.motor;
	var s = search(motor)
	if( s == ""){
    res.statusCode = 404;
    res.send('Error 404: Not found');
	}else{
    s.forEach((champion) => {
      var index = f1championshipsV.indexOf(champion);
      if (index > -1) {
        f1championshipsV.splice(index, 1);
      }
    });
    res.statusCode = 200;
    res.send("200 OK. DELETE resource " + motor)
  }
});


////////////////// POST /////////////////////////////
app.post('/api/v1/f1championships',(req,res) => {
 var datas=req.body[0]
 if(datas.hasOwnProperty('motor') && datas.hasOwnProperty('year') && datas.hasOwnProperty('pilot')
    && datas.hasOwnProperty('country') && datas.hasOwnProperty('wins')){
      var result = searchPOST(datas.motor,datas.year,datas.pilot,datas.country,datas.wins);
      if(result == undefined){
        f1championshipsV.push(datas);
        res.statusCode = 201;
        res.send("201 Created. " + req.body[0].motor + " has been created");
      }else{
        res.statusCode=409;
        res.send("Error 409: Conflict. Resource exist");
      }
  }else{
  	res.statusCode = 400;
  	res.send("Error 400: Bad Request. Invalid parameters");
  }
});

app.post('/api/v1/f1championships/:motor',(req,res) => {
	res.statusCode = 405;
 	res.send("Error 405: Method Not Allowed");
});


/////////////////// PUT //////////////////////////
app.put('/api/v1/f1championships',(req,res) => {
	res.statusCode = 405;
 	res.send("Error 405: Method Not Allowed");
});

app.put('/api/v1/f1championships/:motor',(req,res) => {
  var motor = req.params.motor
	var datas=req.body[0]
  if(datas.hasOwnProperty('motor') && datas.hasOwnProperty('year') && datas.hasOwnProperty('pilot')
     && datas.hasOwnProperty('country') && datas.hasOwnProperty('wins')){
    var s = search(motor);
    if( s == ""){
      res.statusCode = 404;
      res.send('Error 404: Not found');
    }else{
      for (var i in f1championshipsV) {
         if (f1championshipsV[i].motor == motor) {
            f1championshipsV[i].motor = datas.motor;
            f1championshipsV[i].year = datas.year;
            f1championshipsV[i].pilot = datas.pilot;
            f1championshipsV[i].country = datas.country;
            f1championshipsV[i].wins = datas.wins;
            break;
         };
       };
       res.statusCode = 200;
       res.send("200 OK. " + datas.motor + " has been Updated");
    };
  }else{
    res.statusCode = 400;
    res.send("Error 400: Bad Request. Invalid parameters");
  };
});


//////////////////////////////////////////////////
function search(motor){
  var resultado=[];
  f1championshipsV.forEach((f1championships) => {
    if (f1championships.motor == motor){
      resultado.push(f1championships);
    };
  });
  return resultado;
};

function searchPOST(motor,year,pilot,country,wins){
  var resultado;
  f1championshipsV.forEach((f1championships) => {
    if (f1championships.motor == motor && f1championships.year == year && f1championships.pilot == pilot
    && f1championships.country == country && f1championships.wins == wins){
      resultado = f1championships;
    };
  });
  return resultado;
}
