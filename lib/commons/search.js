module.exports.searchBytwoparams = function(arr,param1,param2,content1,content2){

	var searched = arr.filter(function (content) {
    	return content[param1] == content1 && content[param2] == content2;});
	return searched[0];
};

module.exports.searchByparam = function(arr,param1,content1){

	var searched = arr.filter(function (content) {
    	return content[param1] == content1;});
	console.log(searched)
	return searched;
};



module.exports.searchBydate = function(arr,param,content1,content2){

	var searched = arr.filter(function (content) {
    	return parseInt(content[param],10) >= parseInt(content1,10) && parseInt(content[param],10) <=  parseInt(content2,10);});
	return searched;
};