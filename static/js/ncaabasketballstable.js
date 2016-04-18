$( document ).ready(function() {

	console.log("jquery Ready")

    var request = $.ajax({
 			url: '/api/v1/ncaabasketballs?apikey=user',
 			type:"GET",
			contentType: "application/json",


		});


request.done(function(dataJson) {

        	var table = buildTable(dataJson);
        	$("#tablebasket").html(table);
        	console.log(status);


		});


request.always(function(jqXHR, status, statusText) {
 				// Tratamiento en cualquier caso
 				console.log(status)

 				if (status=="error"){
 					$("#tablebasket").html("Not Resources yet");

 				}

			});





function buildTable(dataJson) {
		var table = $('<table width="800" border = 2 >');
		var start = '<tr align="right" >';
				for (var header in dataJson[0]) {

        	start += '<th>' + header + '</th>';
    	}

		start += '</tr>';
		$(start).appendTo(table);
		$.each(dataJson, (index, element) => {
			  var row = '<tr align="right">';
			  $.each(element, (key, val) => {
				    row += '<td align="right"> ' + val + '</td>';
			  });
			  row += '</tr>';

			  $(table).append(row);
		});
		$(table).append('</table>');

		return table;
};





});
