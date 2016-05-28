




module.exports.searchbyquery = function(array,req,res,param){


////params is if someone has different dates. Year is by default



var search = require("../commons/search")

if(isEmptyObject(req.query)){ // esta funcion esta definida abajo
		return array//if empty, return  the same array
	}else{
		//apikey always
		if ((req.query.to && req.query.from && req.query.apikey) || (req.query.offset && req.query.limit && req.query.from && req.query.to && req.query.apikey)){ 
			// from and to    or also 	from and to and offset and limit 
			//filter with library. you enter array, all params
			return search.searchBydate(array,param,req.query.from,req.query.to);

		}else{ //else return the same array

      		return array
    	}



	}


}





function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
