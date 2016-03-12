var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var read= require("fs");


app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(bodyParser.json())



 

var symphonies=[];




app.get('/api/sandbox/symphonies/:composer',function (req,res){
	var name = req.params.composer
	console.log("New GET of resource "+name+ " from "+req.connection.remoteAddress);
	res.send(searchBycomposer(name))//SEARCH CONTACTS

});

app.post('/api/sandbox/symphonies/',(req,res)=>{
 var symphony = req.body;
 console.log("New POST "+contact + " from "+req.connection.remoteAddress);
 symphonies.push(symphony);
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
    console.log("Read "+JSON.stringify(symphonies));
    
  });
  	

	
});



function searchBycomposer(comp){
	var searched = symphonies.filter(function (content) {
    	return content.composer == comp;
})[0];
	 
	return searched;

}
