module.exports.deleteAll = function(arr){

	//remove all
	arr.splice(0,arr.length)
};


module.exports.deleteElement = function(arr,element){
//remove only a element
 var index = arr.indexOf(element);
 if (index > -1) {
    arr.splice(index, 1);
	}
}

module.exports.deleteElementSub = function(arr,element){

	//remove subconjunt
	for(var i in element){
		var index = arr.indexOf(element[i]);
		if(index > -1){
			arr.splice(index, 1);
		}
	}
}
