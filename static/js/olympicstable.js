$( document ).ready(function() {

	console.log("jquery Ready")

    var request = $.ajax({
 			url: '/api/v1/olympicsgames?apikey=user',
 			type:"GET",
			contentType: "application/json",
 			
 			
		});
		

request.done(function(dataJson) {
       
        	var table = buildTable(dataJson);
        	$("#tableOlympics").html(table);
        	$('#tableExport').DataTable( {
        	dom: 'Bfrtip',
        	buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    } );
       
               
		});


request.always(function(jqXHR, status, statusText) {
 				// Tratamiento en cualquier caso
 				console.log(status)

 				if (status=="error"){
 					$("#tableOlympics").html("Not Resources yet");

 				}
				
			});

		



function buildTable(dataJson) {
		var table = $('<table id="tableExport" class="highlight" width="800" border = 2 >');
		var start = '<thead>';
		start += '<tr align="right" >';
		var end = '<tfoot>';
		end += '<tr align="right" >';
				for (var header in dataJson[0]) {

        	start += '<th data-field="'+header+'">' + header + '</th>';
        	end += '<th data-field="'+header+'">' + header + '</th>';
    	}

		start += '</tr>';
		start += '</thead>';
		end += '</tr>';
		end += '</tfoot>';
		$(start).appendTo(table);
		$(end).appendTo(table);
		$(table).append('<tbody>');
		$.each(dataJson, (index, element) => {
			  var row = '<tr align="right">';
			  $.each(element, (key, val) => {
				    row += '<td align="right"> ' + val + '</td>';
			  });
			  row += '</tr>';

			  $(table).append(row);
		});
		$(table).append('</tbody>');
		$(table).append('</table>');

		return table;




};
		





});