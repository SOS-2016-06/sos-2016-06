
var lugar;
var fecha;

var prueba = {from:"value",b:"value"}

var arrprueba = [{casa:"A",perro:"tobby"},{casa:"A",perro:"tobbyas"},{casa:"A",perro:"tobsby"}]

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
		
    	res.sendStatus(404);
	}else{
		//aqui filtro por las query
		var query = req.query
		console.log(searched)
		console.log(query)
		if (checkquery(arr,query,switchParam(param))==false){
			console.log("DEBUG")
			res.sendStatus(404);
		}else{
			//busca
			if(checkquery(arr,query,switchParam(param))==true){

				if (fromto(query)==true){

					delvolver = search.searchBydate(searched,"from","to",query.from,query.to);
					
					res.send(JSON.stringify(delvolver));
					
					//busca norma por dos paramtros
				}else{
					devolver = filterbyqueries(searched,query);
					if (devolver==undefined){
						res.sendStatus(404);

					}else{
						res.send(JSON.stringify(devolver));
					}
					

				}

			}else{
				res.sendStatus(400);

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
	return fromf&&tof

}




}

function filterbyqueries(arr,queries){
var arrtemp = [arr]
var cont = 0

for (var query in queries){//unaquery
	for ( var arr in arrtemp){//un elemento del array
		
		for (var obj in arrtemp[arr]){// objeto del array
			
			for (var prop in arrtemp[arr][obj]){//propiedad del array
				if(arrtemp[arr][obj][prop]==queries[query] && query == prop) {
					console.log(queries[query]+" "+query +" "+arrtemp[arr][obj][prop]+" "+ prop)
					arrtemp.push(arrtemp[arr][obj]);
					cont= cont + 1;
					
				}
			}

			

		}
	}
			
			//if()
			//jugando con conjuntos
			//localhost:8080/api/v1/olympicsgames/sevilla?a=valuea1&b=value2
		
}
if (cont>0){
	return arrtemp.slice(-cont)
}
	return undefined

}


function checkquery(arr,query,init){
	var res = true
	
	for (var i in query){


		var checkbyfield = checkfieldArr(arr,i)
		
		console.log(i+" "+init)
		if ( (i==init || checkbyfield==false) || (i=="from" || i=="to" || i=="limit" || i=="offset")){
			console.log("CHECKQUERY"+i+" "+init)
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