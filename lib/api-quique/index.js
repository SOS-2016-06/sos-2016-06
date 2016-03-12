var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var read= require("fs");


app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(bodyParser.json())



 

var symphonies=[];




app.get('/contacts/:name',function (req,res){
	var name = req.params.name
	console.log("New GET of resource "+name);
	res.send(contacts[0])//SEARCH CONTACTS

});

app.post('/contacts',(req,res)=>{
 var contact = req.body;
 console.log("New POST"+contact);
 contacts.push(contact);
 res.sendStatus(200);

});


app.get("/api-test/symphonies/loadInitialData",(req,res) => {
  
  //read JSON Async
  read.readFile('./lib/api-quique/dataset.json','utf8',(err,content) => {
    //ASinc
    symphonies = JSON.parse(content);
    res.render('datasymphoniesprint',{
      titulo : "LOADED DATA",
      content : symphonies
    });
    
  });
  	console.log("Read "+JSON.stringify(symphonies));

	
});

