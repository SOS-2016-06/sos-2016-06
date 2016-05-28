


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

	//CAN PAGINATE QUERY AND PARAMS(required)
	var param = req.params.param;


	//filter by param /:param/	year or city
	//switchParam(param) decided if year or city
	var paramsearch = search.searchByparam(olympicsgames,switchParam(param),param);

	//filter by queries ?querie
	var searched  = searchbyquery.searchbyquery(paramsearch,req,res,"year"); //always by year

	// paginate
	var conjunt  = pagination.pag(searched,req,res);

	//return array or error
	if( conjunt == ""){
    res.sendStatus(404);
  	}else{
    	res.send(conjunt);
  	};

	
};	




module.exports.getaOlympicGamesbycitiesandyear = function (req,res){
	var name = req.params.city
	var year = req.params.year
	console.log("New GET of resource "+name+ " from "+req.connection.remoteAddress);


	//ONLY PARAMS (required)
	var paramsearch = search.searchBytwoparams(olympicsgames,"city","year",name,year)


	
	//return array or error
	if(paramsearch==undefined){
		console.log("Resource not found")

    	res.sendStatus(404);
	}else{

		//check if exist apikey
		if(checkquery(req.query)==false){
		res.sendStatus(400);
		}else{

			res.send(paramsearch)
		}
	}
};




module.exports.getOlympicsGames =function (req,res){
	console.log("New GET all olympicsgames from "+req.connection.remoteAddress);
	
	//CAN PAGINATE AND QUERIES


	//filter by query
	var search  = searchbyquery.searchbyquery(olympicsgames,req,res,"year");


	//paginate
	var conjunt  = pagination.pag(search,req,res);

	//Return or error
	if (conjunt === undefined || conjunt.length == 0){
		res.sendStatus(404);
	}else{
		

	res.send(conjunt);
	
	}

};




//posts

module.exports.addOlympicgame = function(req,res){

 var olympic=req

 //check it is valid the format
 checkvar = checkdataRequest(olympic);



 if(checkvar== true){
 	//search if exist
 	if (searchPOST(olympic.year,olympic.city)==undefined){//no existe
		add.addElementToarr(olympicsgames,olympic);
		console.log("New POST "+olympic);
	res.sendStatus(201);
 	}else{

 	//exist
 	res.sendStatus(409);

 	}


 }else{

 	res.sendStatus(400);
 }


};


//PUT

 module.exports.updateOlympicgame = function (req,body,res){
	var city = req.params.city
	var year = req.params.year
	var olympic=body

	//check it is valid the format
 	checkvar = checkdataRequest(olympic);


 if(checkvar== true){
 	//search resource
 	var searched = search.searchBytwoparams(olympicsgames,"city","year",city,year)
 	if(searched==undefined){//if no exist
		console.log("Resource not found")

		res.sendStatus(404);

	}else{//if exist
		if(olympic.year == year && olympic.city==city){
			//if year and city are same url and request body

			//city and year  caught from params
			//olympic is new value

			//update array with de new element
			update.updateFunction(olympicsgames,"city","year",city,year,olympic)
			console.log("PUT "+city+ " from "+req.connection.remoteAddress);
	 		res.sendStatus(200);
	 	}else{
	 		res.sendStatus(400);
	 	}
		
	}



 }else{

 	console.log("PUT failed from "+req.connection.remoteAddress);
 	res.sendStatus(400);
 }

}




//DELETE

module.exports.removeAll = function(req,res){
	//remove all
	deletevar.deleteAll(olympicsgames)
	res.sendStatus(200);

};


module.exports.removeOlympic = function (req,res){
	//remove only one

	var city = req.params.city
	var year = req.params.year


	//return only 1 element
	var searched = search.searchBytwoparams(olympicsgames,"city","year",city,year)
	if(searched==undefined){//not exist

		console.log("Resource not found")

		
    	res.sendStatus(404);
	}else{
		//delete only one
		deletevar.deleteElement(olympicsgames,searched)
		console.log("DELETE resource "+city+ " from "+req.connection.remoteAddress);
		res.sendStatus(200);
		}
}

module.exports.removeSubSet = function (req,res){
  
	var param = req.params.param;
 	//return some element
    var searched = search.searchByparam(olympicsgames,switchParam(param),param);
   

    if( searched == "" || search == undefined){
      res.sendStatus(404);
  	}else{
      deletevar.deleteElementSub(olympicsgames,searched);
      res.sendStatus(200);
    }
  
}

//FUNCTIONS AUX

//Search if exist
function searchPOST(year,city){
  var res;
  olympicsgames.forEach((obj) => {
    if (obj.city == city && obj.year == year){
    	
      res = obj;
    };
  });
  return res;
}


function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}


//check sintaxis request
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

function checkquery(query){
 	var flag = false;
 	var cont = 0

 	for(i in query){
 		if(i=='apikey'){
 			flag = true
 			
 		}
 		cont = cont +1
 	}

 	return flag && (cont==1)

}