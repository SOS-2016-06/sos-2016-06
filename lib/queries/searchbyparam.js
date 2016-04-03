
var lugar;
var fecha;



module.exports.searchbyquery = function (req,res,arr,geo,year){
	lugar = geo;
	fecha = year;

	if(!isEmptyObject(req.query)){ // esta funcion esta definida abajo
		queryfilter(req,res,arr)//tiene query
	}else{
		normalfilter(req,res,arr);
		
	}

	
};


function queryfilter(req,res,arr){

	var search = require("../commons/search")
	var param = req.params.param
	console.log("New GET of resource "+param+ " from "+req.connection.remoteAddress);
	var searched = search.searchByparam(arr,switchParam(param),param)//filter por el primer /:param y devuelve conjunto
	
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

						res.send(JSON.stringify(devolver));
						/////AQUI ES DONDE SE ENVIA LOS DATOS FILTRADOS

					}		
															
			}else{
					var devolver = filterbyqueries(searched,query);
				if (devolver==undefined){
						res.sendStatus(404);

				}else{res.send(JSON.stringify(devolver));}					
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

}}

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

		if ((i=="from" || i=="to" || i=="limit" || i=="offset")){
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
	var searched = search.searchByparam(arr,switchParam(param),param)
	if(isEmptyObject(searched)){
		console.log("Resource not found")
		
    	res.sendStatus(404);
	}else{
		//flujo de paginación
		res.send(JSON.stringify(searched))//SEARCH CONTACTS
	}


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