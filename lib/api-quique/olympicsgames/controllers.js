


var read= require("fs");

var olympicsgames = [];



module.exports.loadInitData= function(req,res){

//read JSON Async
  read.readFile('./lib/api-quique/olympicsgames/dataset.json','utf8',(err,content) => {
    //ASinc
    olympicsgames = JSON.parse(content);

    res.sendStatus(200)
    
    console.log("Read "+JSON.stringify(olympicsgames));

  });


};





//GETTERS
module.exports.getaOlympicGame = function (req,res){
	var name = req.params.city
	console.log("New GET of resource "+name+ " from "+req.connection.remoteAddress);
	var searched = searchByCity(name)
	if(searched==undefined){
		console.log("Resource not found")
		
    	res.sendStatus(404);
	}else{
		res.send(JSON.stringify(searched))//SEARCH CONTACTS
	}
};

module.exports.getOlympicsGames =function (req,res){
	console.log("New GET all olympicsgames from "+req.connection.remoteAddress);

	if (olympicsgames === undefined || olympicsgames.length == 0){
		res.sendStatus(404);
	}else{

	res.send(JSON.stringify(olympicsgames));//SEARCH CONTACTS
	}

};




//posts

module.exports.addOlympicgame = function(req,res){
	
 var olympic=req
 
 checkvar = checkdataRequest(olympic);
 //console.log(req.body.composer)
 //console.log("composer1 "+req.body.hasOwnProperty("composer"))
 if(checkvar== true){

  	olympicsgames.push(olympic);
 	console.log("New POST "+olympic);
 	
 	res.sendStatus(201);

 }else{
 	
 	res.sendStatus(406);
 }


};


//PUT

 module.exports.updateOlympicgame = function (req,body,res){
	var name = req.params.city
	var olympic=body
 	checkvar = checkdataRequest(olympic);
 //console.log(req.body.composer)
 //console.log("composer1 "+req.body.hasOwnProperty("composer"))
 if(checkvar== true){
 	var searched = searchByCity(name)
 	if(searched==undefined){
		console.log("Resource not found")
		
		res.sendStatus(404);
    	
	}else{
	updateElement(name,olympic)
	console.log("PUT "+name+ " from "+req.connection.remoteAddress);
 	res.sendStatus(200);
		//UPDATE
	}



 }else{

 	console.log("PUT failed from "+req.connection.remoteAddress);
 	res.sendStatus(406);
 }

}




//DELETE

module.exports.removeAll = function(req,res){
	olympicsgames.splice(0,olympicsgames.length)
	res.sendStatus(200);

};


module.exports.removeOlympic = function (req,res){
	var name = req.params.city

	var searched = searchByCity(name)
	if(searched==undefined){//notexist
		console.log("Resource not found")
		
		//res.sendStatus(404);
    	res.sendStatus(404);
	}else{
		deleteElement(searched);
		console.log("DELETE resource "+name+ " from "+req.connection.remoteAddress);
		res.sendStatus(200);
		}
}





//FUNCTIONS AUX

function searchByCity(comp){
	console.log(comp)
	var searched = olympicsgames.filter(function (content) {
    	return content.city.toLowerCase() == comp.toLowerCase();})[0];
	return searched;};

function checkdataRequest(request){

		if(!request.hasOwnProperty('city') ||!request.hasOwnProperty('year')
		||!request.hasOwnProperty('sportsnumber')||!request.hasOwnProperty('athletes')
		||!request.hasOwnProperty('modality')){
		return false

	}else{
		return true
	}


};
function deleteElement(element){
 var index = olympicsgames.indexOf(element);
 if (index > -1) {
    olympicsgames.splice(index, 1);
}

};

function updateElement(city,element){

	for (var i in olympicsgames) {

     if (olympicsgames[i].city.toLowerCase() == city.toLowerCase()) {
        olympicsgames[i] = element
        

        break; //Stop this loop, we found it!
     }
   }
}