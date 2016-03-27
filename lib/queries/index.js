var limit = false
var offset = false
var fields = false
var search = false


function checkFlags(req){
	
	if (req.query){
		if (req.query.limit){
		limit = true

		}
		else if (req.query.offset){
		offset=true
		}
		else if (req.query.fields){
		fields = true
		}else{
			search=true
		}
	}

	console.log(limit)
	console.log(offset)
	console.log(fields)
	console.log(search)

}
function resetFlags(){
	limit = false
	offset = false
	fields = false
	search = false
}


module.exports.queries = function (arr,req){
	checkFlags(req)
	if (search==true){
		if (checksearch(arr,req)==true){
			filterByfields(arr,req)
		}else{
			return null //Aqui seguramente  response con el status
		}
	}


	resetFlags()

}



function filterByfields(arr,req){
var searched = arr.filter(function (content) {
		var flag = false 
		var query =req.query
		console.log("Entra")
		for (var i in query){
			
			if(content.hasOwnProperty(i)){
				console.log(query[i] +"   "+ content.i)
				if(content.i==query[i]){
					//MISSING falta comparar el filtro
				flag=true
				console.log("LLEGA")
						}
			}else{
				flag = false
			}
		}

    	return flag
    	;})
	return searched;
}




function checksearch(arr,req){
	var res = true
	var flag = false
	for (var i in req.query){
		flag = false
		for (var e in arr){
			if (arr[e].hasOwnProperty(i)){
				flag =  true
				break
			}
		}
		if (flag == false){
			res= false
			break
		}

	}
	return res
	
}


