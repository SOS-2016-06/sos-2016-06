(function ( $ ) {



$.getDataAjax = function(method, url){
	
	var result ;
	//console.log(object)
request = $.ajax({
        url: url,
        type: method,
        
        async: false,
        dataType: 'json',
       
    });


request.done(function(data, status){

	//solo si lo encuentra lo devuelve
	
	if (status=="success"){
		result = data


	}



	});

return result;

}
}( jQuery ));