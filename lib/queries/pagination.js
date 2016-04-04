module.exports.returnASet = function(array,limit,offset){

  var result = [];
  var i;
      for(i=offset;i<=limit;i++){
        result.push(array[i]);
    };
    return result;
};


module.exports.pag = function(array,req,res){

if(isEmptyObject(req.query)){ // esta funcion esta definida abajo
		return array//tiene query
	}else{
		if (req.query.offset && req.query.limit){
			return subCojunt(array,req.query.limit,req.query.offset);

		}else if(req.query.apikey){
      res.send(array);
		}else{
      res.sendStatus(400);
    }



	}




}


function subCojunt(array,limit,offset){
	 var result = [];
  	 var limitint = parseInt(limit,10);
  	 var offsetint = parseInt(offset,10);
  	 if(!isEmptyObject(array)){


      for(var i=offsetint;i<limitint+offsetint;i++){
        result.push(array[i]);

        if (i==array.length-1){
        	break
   		 }
        }
   	}
    return result;
};



function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
