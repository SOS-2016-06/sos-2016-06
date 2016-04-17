$( document ).ready(function() {
	var count = 0;

	console.log("jquery Ready")
  $("#button").click(function(){
		var type = $('input[type=radio]:checked').attr("id");
    var val =  $("#url").val();
    var data = $("#payload").val();
    $( "#data" ).empty();
    $( "#list" ).empty();
    $( "#log" ).append( "<br/>"+type+"   "+val );

    var request = $.ajax({
 			url: val,
 			type:type,
			contentType: "application/json",
 			data: data,
 			statusCode: {
      	200: function (response) {
					$( "#codestatus" ).text( "Ok" );
      	},
      	201: function (response) {
         $( "#codestatus" ).text( "Created" );
      	},
      	400: function (response) {
					$( "#codestatus" ).text( "Bad Request" );
      	},
      	401: function (response) {
					$( "#codestatus" ).text( "Unauthorized" );
      	},
      	403: function (response) {
					$( "#codestatus" ).text( "Forbidden" );
      	},
      	404: function (response) {
					$( "#codestatus" ).text( "Not Found" );
				},
      	405: function (response) {
					$( "#codestatus" ).text( "Method Not Allowed" );
      	},
      	409: function (response) {
        	$( "#codestatus" ).text( "Conflict" );
      	}
			},
		});
		

		request.done(function(datajson,status,jqXHR) {
			var str = JSON.stringify(datajson,null, "\t");
				// Tratamiento en caso de exito
				console.log(datajson);
				if (typeof datajson == "object"){

					$( "#data" ).text(str);	
				}

			
			console.log(typeof datajson[0]);
			if (typeof datajson[0] == "object"){
			$.each(datajson, function(index, element) {
				

            	$( "#list" ).append("<li>"+ JSON.stringify(element,null, "\t") +"</li>");
       		 	});
			}else if (typeof datajson=="object"){
            	$( "#list" ).append("<li>"+ JSON.stringify(datajson,null, "\t") +"</li>");

			}


			});

			request.always(function(jqXHR, status, statusText) {
 				// Tratamiento en cualquier caso
				$( "#status" ).text( request.status );
				$( "#log" ).append("   "+request.status);
			});
    });
});