(function ( $ ) {



$.addCountryArray = function (array){

	for (var i in array){
		addCountry(array[i])
		

	}

}


function addCountry(object){
	
	
	//console.log(object)
request = $.ajax({
        url: "https://restcountries.eu/rest/v1/capital/"+object.city,
        type: "GET",
        
        async: false,
        dataType: 'json',
       
    });


request.done(function(data, status){

	//solo si lo encuentra lo devuelve
	
	if (status=="success"){

		if (data[0].name =="United States"){
			object.country= "EEUU"
			

		}else{

			object.country= data[0].name 
		}


	}



	});



}
}( jQuery ));