


var read= require("fs");


var olympicsgames = [];
var search = require("../../commons/search")
var deletevar = require("../../commons/delete")
var add = require("../../commons/add")
var update = require("../../commons/update")
var searchbyquery = require("../../queries/searchbyparam")
var pagination = require("../../queries/pagination")



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


	var param = req.params.param;	
	var search = search.searchByparam(olympicsgames,switchParam(param),param);
	var searched  = searchbyquery.searchbyquery(search,req,res,"year");
	var conjunt = conjunt = pagination.pag(searched,req,res);
	if( conjunt == ""){
    res.sendStatus(404);
  	}else{
    	res.send(s);
  	};

	//searchbyquery.searchbyquery(req,res,olympicsgames, "city","year"); //metes req,res,array donde estan los datos y te olvidas
};	//primero tu campo geografico y despues tu campo temporal




module.exports.getaOlympicGamesbycitiesandyear = function (req,res){
	var name = req.params.city
	var year = req.params.year
	console.log("New GET of resource "+name+ " from "+req.connection.remoteAddress);
	var searched = search.searchBytwoparams(olympicsgames,"city","year",name,year)
	
	if(searched==undefined){
		console.log("Resource not found")

    	res.sendStatus(404);
	}else{
		res.send(JSON.stringify(searched))
		//SEARCH CONTACTS
	}
};



module.exports.getOlympicsGames =function (req,res){
	console.log("New GET all olympicsgames from "+req.connection.remoteAddress);
	

	
	var search  = searchbyquery.searchbyquery(olympicsgames,req,res,"year");
	var conjunt = conjunt = pagination.pag(search,req,res);

	

	//var conjunt= pagination.pag(searched,req,res)

	if (conjunt === undefined || conjunt.length == 0){
		res.sendStatus(404);
	}else{

	res.send(JSON.stringify(conjunt));
	//SEARCH CONTACTS
	}

};




//posts

module.exports.addOlympicgame = function(req,res){

 var olympic=req

 checkvar = checkdataRequest(olympic);
 //console.log(req.body.composer)
 //console.log("composer1 "+req.body.hasOwnProperty("composer"))
 if(checkvar== true){

  	add.addElementToarr(olympicsgames,olympic)
 	console.log("New POST "+olympic);

 	res.sendStatus(201);

 }else{

 	res.sendStatus(406);
 }


};


//PUT

 module.exports.updateOlympicgame = function (req,body,res){
	var city = req.params.city
	var year = req.params.year
	var olympic=body
 	checkvar = checkdataRequest(olympic);
 //console.log(req.body.composer)
 //console.log("composer1 "+req.body.hasOwnProperty("composer"))
 if(checkvar== true){
 	var searched = search.searchBytwoparams(olympicsgames,"city","year",city,year)
 	if(searched==undefined){
		console.log("Resource not found")

		res.sendStatus(404);

	}else{
	update.updateFunction(olympicsgames,"city","year",city,year,olympic)
	console.log("PUT "+city+ " from "+req.connection.remoteAddress);
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
	deletevar.deleteAll(olympicsgames)
	res.sendStatus(200);

};


module.exports.removeOlympic = function (req,res){
	var city = req.params.city
	var year = req.params.year

	var searched = search.searchBytwoparams(olympicsgames,"city","year",city,year)
	if(searched==undefined){//notexist
		console.log("Resource not found")

		//res.sendStatus(404);
    	res.sendStatus(404);
	}else{
		deletevar.deleteElement(olympicsgames,searched)
		console.log("DELETE resource "+city+ " from "+req.connection.remoteAddress);
		res.sendStatus(200);
		}
}

module.exports.removeSubSet = function (req,res){
  var regex = /^[0-9]{4}/;
	var param = req.params.param;
  if(param.match(regex)){
    var s = search.searchByparam(olympicsgames,"year",param);
    del.deleteElementSub(olympicsgames,s);
    res.sendStatus(200);
  }else{
    var s = search.searchByparam(olympicsgames,"city",param);
    if( s == ""){
      res.sendStatus(404);
  	}else{
      del.deleteElementSub(olympicsgames,s);
      res.sendStatus(200);
    }
  }
}

//FUNCTIONS AUX



function checkdataRequest(request){

		if(!request.hasOwnProperty('city') ||!request.hasOwnProperty('year')
		||!request.hasOwnProperty('sportsnumber')||!request.hasOwnProperty('athletes')
		||!request.hasOwnProperty('modality')){
		return false

	}else{
		return true
	}


};


function switchParam(content){
	var regex = /^[0-9]{4}$/
	var result = content.match(regex);

	if (result==null){

		return "city"
	}else{

		return "year"
	}
}
