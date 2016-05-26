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
		return array
	}else{
    //si tiene parametros llama a la funcion y devuelve el conjunto buscado
		if ((req.query.offset && req.query.limit && req.query.apikey) || (req.query.offset && req.query.limit && req.query.from &&req.query.to && req.query.apikey) ){
			return subCojunt(array,req.query.limit,req.query.offset);

    //este else if no tiene muchos sentido
		}else if(req.query.apikey){
      return array;
		}else{
      return array
      
    }



	}




}


function subCojunt(array,limit,offset){
	 var result = [];

    //parseamos para tener posibilidad de operaciones aritmeticas
  	 var limitint = parseInt(limit,10);
  	 var offsetint = parseInt(offset,10);
  	 if(!isEmptyObject(array)){

      //esta es la que pagina y devuelve el conjunto
      for(var i=offsetint;i<limitint+offsetint;i++){
        result.push(array[i]);
        //controla el offset, si es mayor al tamano de la array, para el bucle
        if (i==array.length-1){
        	break
   		 }
        }
   	}
    return result;
};

//si esta vacio un objeto

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
