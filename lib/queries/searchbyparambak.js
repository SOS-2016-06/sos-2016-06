
var lugar;
var fecha;



module.exports.searchbyquery = function (req,res,arr,geo,year){
	lugar = geo;
	fecha = year;
	
	if(!isEmptyObject(req.query)){
		if(isEmptyObject(req.params)){
			return arr // esta funcion esta definida abajo SIN PARAMS
			

		}else{
			
			return queryfilterparam(req,res,arr)
		}
		//tiene query
	}else{
		if(isEmptyObject(req.params)){
			return queryfilter(req,res,arr);
		}else{
			
			return normalfilter(req,res,arr);
			
			
		}
		
		
	}

	
};


function queryfilter(req,res,arr){

	var search = require("../commons/search")
	
	console.log("New GET of resource "+param+ " from "+req.connection.remoteAddress);
	var searched = arr

	//filter por el primer /:param y devuelve conjunto
	


	if(isEmptyObject(searched)){
		var query = req.query
		console.log("Resource not found")
		
    	res.sendStatus(404);
	}else{
		//aqui filtro por las query
		var query = req.query
		if (checkquery(arr,query,"externocleido")==false){
			
			
			res.sendStatus(404);
		}else{
		
			//busca
			if (fromto(query)==true){
					var devolver = search.searchBydate(searched,fecha,query.from,query.to);
					if (isEmptyObject(devolver)){
						res.sendStatus(404);

					}else{
						//AQUI HAY QUE USAR PAGINACION "devolver" es un ARRAY directamente

						return devolver
						/////AQUI ES DONDE SE ENVIA LOS DATOS FILTRADOS

					}		
															
			}else{
					var devolver = filterbyqueries(searched,query);
				if (devolver==undefined){
						res.sendStatus(404);

				}else{return devolver;}					
			}

		}
		
	}
}





function queryfilterparam(req,res,arr){

	var search = require("../commons/search")
	var param = req.params.param
	console.log("New GET of resource "+param+ " from "+req.connection.remoteAddress);
	var searched = search.searchByparam(arr,switchParam(param),param)

	//filter por el primer /:param y devuelve conjunto
	


	if(isEmptyObject(searched)){
		var query = req.query
		console.log("Resource not found")
		
    	res.sendStatus(404);
	}else{
		//aqui filtro por las query
		var query = req.query
		if (checkquery(arr,query,switchParam(param))==false){
			
			
			res.sendStatus(404);
		}else{
		
			//busca
			if (fromto(query)==true){
					var devolver = search.searchBydate(searched,fecha,query.from,query.to);
					if (isEmptyObject(devolver)){
						res.sendStatus(404);

					}else{
						//AQUI HAY QUE USAR PAGINACION "devolver" es un ARRAY directamente

						return devolver
						/////AQUI ES DONDE SE ENVIA LOS DATOS FILTRADOS

					}		
															
			}else{
					var devolver = filterbyqueries(searched,query);
				if (devolver==undefined){
						res.sendStatus(404);

				}else{return devolver;}					
			}

		}
		
	}
}




function fromto(query){
	fromf = false;
	tof= false; 
	for (i in query){
		if (i == "from"){
			fromf=true;
		}
		if (i== "to"){
			tof=true;
		}
	}
	return fromf&&tof;

}

function filterbyqueries(arr,queries){
var arrtemp = [arr]
var cont = 0

for (var query in queries){//unaquery
	for ( var arr in arrtemp){//un elemento del array
		
		for (var obj in arrtemp[arr]){// objeto del array
			
			for (var prop in arrtemp[arr][obj]){//propiedad del array
				if(arrtemp[arr][obj][prop]==queries[query] && query == prop) {
					arrtemp.push(arrtemp[arr][obj]);
					cont= cont + 1;
					
				}
			}

			

		}
	}
}
if (cont>0){
	return arrtemp.slice(-cont)
}
	return undefined


}


function checkquery(arr,query,init){
	var res = true
	
	for (var i in query){

		if ((i=="from" || i=="to" || i=="limit" || i=="offset"|| i=="apikey")){
			var checkbyfield = true;	
		}else{
		var checkbyfield = checkfieldArr(arr,i)	;
		}

		
		

		if ( (i==init || checkbyfield==false) ){
			res = false;
			break;
		}

	}	

	return res
}



function checkfieldArr(arr,param){
	
	var res = false;
	for (var obj in arr){
		
		
		for (var prop in arr[obj]){
			
			if (prop == param){
				res = true;
				break;
			}
		}
	}
	return res;
}



function normalfilter(req,res,arr){
	var search = require("../commons/search")
	var param = req.params.param
	console.log("New GET of resource "+param+ " from "+req.connection.remoteAddress);
	var busca = search.searchByparam(arr,switchParam(param),param)
	console.log(typeof  busca + "DEBUG")

	if(isEmptyObject(busca)){
		console.log("Resource not found")
		
    	res.sendStatus(404);
	}
		//flujo de paginación
		
	return busca//SEARCH CONTACTS
		
	


};



// This should work in node.js and other ES5 compliant implementations.
function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}


function switchParam(content){
	var regex = /^[0-9]{4}$/
	var result = content.match(regex);
	
	if (result==null){
		
		return lugar
	}else{

		return fecha
	}
}