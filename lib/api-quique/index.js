var express = require('express');
var app = module.exports = express();
var bodyParser = require("body-parser")

var contacts =[{name:"manolo"}]




app.get('/contacts/:name',function (req,res){
	var name = req.params.name
	console.log("NNew GET of resource "+name);
	res.send(contacts[0])

});

app.post('/contacts',(req,res)=>{
 var contact = req.body
 console.log("New POST")
 contacts.push(contact)
 res.sendStatus(200)

});