




module.exports.searchbyquery = function(array,req,res,param){
var search = require("../commons/search")

if(isEmptyObject(req.query)){ // esta funcion esta definida abajo
		return array//tiene query
	}else{
		if ((req.query.to && req.query.from && req.query.apikey) || (req.query.offset && req.query.limit && req.query.from && req.query.to && req.query.apikey)){ 
			return search.searchBydate(array,param,req.query.from,req.query.to);

		}else if(req.query.apikey){
      return array;
		}else{

      return array
    }



	}


}





function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
