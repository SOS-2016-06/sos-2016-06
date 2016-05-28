
module.exports.pag = function(array,req,res){

if(isEmptyObject(req.query)){ // esta funcion esta definida abajo
		return array
	}else{
    //si tiene parametros llama a la funcion y devuelve el conjunto buscado
		if ((req.query.offset && req.query.limit && req.query.apikey) || (req.query.offset && req.query.limit && req.query.from &&req.query.to && req.query.apikey) ){
			//apikey always
      //ofset and limit or also offset and limit and to and from
      
      //Enter array limit and offset
      return subCojunt(array,req.query.limit,req.query.offset);

    //este else if no tiene muchos sentido
		
		}else{
      return array
      
    }



	}




}

// Si offset es mayor al tamano de la array, NOT FOUND


//Si limit 0, NOT FOUD


//Si limit es mayor a lo que puede mostrar, solo muestra lo que pueda


function subCojunt(array,limit,offset){
	 var result = [];

    //parseamos para tener posibilidad de operaciones aritmeticas
  	 var limitint = parseInt(limit,10);
  	 var offsetint = parseInt(offset,10);


  	 if(!isEmptyObject(array)){
      if (offsetint<= array.length-1){

      //esta es la que pagina y devuelve el conjunto
      for(var i=offsetint;i<limitint+offsetint;i++){
        result.push(array[i]);
        
        if (i==array.length-1){
        	break
   		 }
        }
      }
   	}
    return result;



};





//si esta vacio un objeto

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
