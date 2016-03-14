var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser");
var read= require("fs");


app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(bodyParser.json())





var symphonies=[];



//GETTERS
app.get('/api/sandbox/symphonies/:composer',function (req,res){
	var name = req.params.composer
	console.log("New GET of resource "+name+ " from "+req.connection.remoteAddress);
	var searched = searchBycomposer(name)
	if(searched==undefined){
		console.log("Resource not found")
		res.statusCode = 404;
		//res.sendStatus(404);
    	res.send('Error 404: No symphony found');
	}else{
		res.send(JSON.stringify(searched))//SEARCH CONTACTS
	}
});

app.get('/api/sandbox/symphonies/',function (req,res){
	console.log("New GET all symphonies from "+req.connection.remoteAddress);

	if (symphonies === undefined || symphonies.length == 0){
		res.send("Not symphonies yet");
	}else{

	res.send(JSON.stringify(symphonies));//SEARCH CONTACTS
	}

});



//posts

app.post('/api/sandbox/symphonies/',(req,res)=>{
 var symphony=req.body[0]
 checkvar = checkdataRequest(symphony);
 //console.log(req.body.composer)
 //console.log("composer1 "+req.body.hasOwnProperty("composer"))
 if(checkvar== true){

  	symphonies.push(symphony);
 	console.log("New POST "+symphony+ " from "+req.connection.remoteAddress);
 	res.statusCode = 200;
 	res.send(req.body[0].composer+" has been created");

 }else{
 	res.statusCode = 406;
 	res.send("406 Not Acceptable missing parameters");
 }


});

app.post('/api/sandbox/symphonies/:composer',(req,res)=>{
	console.log("DELETE failed from "+req.connection.remoteAddress);
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");

});


//DELETES
app.delete('/api/sandbox/symphonies/:composer',function (req,res){
	var name = req.params.composer

	var searched = searchBycomposer(name)
	if(searched==undefined){//notexist
		console.log("Resource not found")
		res.statusCode = 404;
		//res.sendStatus(404);
    	res.send('Error 404: No symphony found');
	}else{
		deleteElement(searched);
		console.log("DELETE resource "+name+ " from "+req.connection.remoteAddress);
		res.send("DELETE resource "+name)//SEARCH CONTACTS
	}
});


//WARNINGS
app.delete('/api/sandbox/symphonies',(req,res)=>{
	symphonies.splice(0,symphonies.length)
	res.statusCode = 200;
 	res.send("All Remove");

});



//PUT


app.put('/api/sandbox/symphonies/:composer',function (req,res){
	var name = req.params.composer
	var symphony=req.body[0]
 	checkvar = checkdataRequest(symphony);
 //console.log(req.body.composer)
 //console.log("composer1 "+req.body.hasOwnProperty("composer"))
 if(checkvar== true){
 	var searched = searchBycomposer(name)
 	if(searched==undefined){
		console.log("Resource not found")
		res.statusCode = 404;
		//res.sendStatus(404);
    	res.send('Error 404: No symphony found');
	}else{
	updateElement(name,symphony)
	console.log("PUT "+name+ " from "+req.connection.remoteAddress);
 	res.statusCode = 200;
 	res.send(symphony.composer+" has been Updated");
		//UPDATE
	}



 }else{

 	console.log("PUT failed from "+req.connection.remoteAddress);
 	res.statusCode = 406;
 	res.send("406 Not Acceptable missing parameters");
 }

});

app.put('/api/sandbox/symphonies',(req,res)=>{
	res.statusCode = 405;
 	res.send("405 Method Not Allowed");

});



//LOAD DATA/////
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

//FUNCTIONS AUX

function searchBycomposer(comp){
	var searched = symphonies.filter(function (content) {
    	return content.composer.toLowerCase() == comp.toLowerCase();})[0];
	return searched;};

function checkdataRequest(request){

		if(!request.hasOwnProperty('composer') ||!request.hasOwnProperty('duration')
		||!request.hasOwnProperty('number')){
		return false

	}else{
		return true
	}


};
function deleteElement(element){
 var index = symphonies.indexOf(element);
 if (index > -1) {
    symphonies.splice(index, 1);
}

};

function updateElement(name,element){

	for (var i in symphonies) {

     if (symphonies[i].composer.toLowerCase() == name.toLowerCase()) {
        symphonies[i].composer = element.composer;
        symphonies[i].duration = element.duration;
        symphonies[i].number = element.number;


        break; //Stop this loop, we found it!
     }
   }
}
