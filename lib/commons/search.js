module.exports.searchBytwoparams = function(arr,param1,param2,content1,content2){
//filter one array  by two parameter
	var searched = arr.filter(function (content) {
		//if contain is valid

    	return content[param1] == content1 && content[param2] == content2;});
	return searched[0];
};

module.exports.searchByparam = function(arr,param1,content1){
	//filter one array  by a parameter


	var searched = arr.filter(function (content) {
		//if contain is valid

    	return content[param1] == content1;});

	return searched;
};



module.exports.searchBydate = function(arr,param,content1,content2){
	////params is if someone has different dates. Year is by default

	var searched = arr.filter(function (content) {
		//if it is found between year from and year to is valid

    	return parseInt(content[param],10) >= parseInt(content1,10) && parseInt(content[param],10) <=  parseInt(content2,10);});
	return searched;
};