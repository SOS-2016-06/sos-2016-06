
var lugar;
var fecha;

var prueba = {from:"value",b:"value"}

var arrprueba = [{casa:"A",perro:"tobby"},{casa:"B",perro:"tobby"},{p:"a"}]

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
		console.log("Resource not fosund")
		checkquery(arrprueba,query,switchParam(param));
		filterbyqueries(arrprueba,query);
    	res.sendStatus(404);
	}else{
		//aqui filtro por las query
		var query = req.query
		console.log(searched)
		console.log(query)
		if (checkquery(arr,query,switchParam(param))==false){
			res.sendStatus(404);
		}else{
			//busca
		}
		res.send(JSON.stringify(searched))//SEARCH CONTACTS
	}




}

function filterbyqueries(arr,queries){
var arrtemp = arr
for (var query in queries){
	for ( var obj in arrtemp)
		for (prop in arrtemp[obj]){
			console.log(query+"  "+prop)
			//jugando con conjuntos
		}
}

}


function checkquery(arr,query,init){
	var res = true
	
	for (var i in query){
		var checkbyfield = checkfieldArr(arr,i)
		
		console.log(i+" "+init)
		if (i!="from" || i!="to" || i!="limit" || i!="offset" || i==init ||checkbyfield==false ){
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