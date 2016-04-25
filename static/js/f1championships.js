$( document ).ready(function() {

  var request = $.ajax({
    url: '/api/v1/f1championships?apikey=user',
    type:"GET",
    contentType: "application/json",
  });


  request.done(function(data) {
    var table = $('<table width="800" border = 2 class="table table-hover"><thead>');
    // Header
		var start = '<tr align="right" >';
    for (var header in data[0]) {
      start += '<th>' + header + '</th>';
    }
    start += '</tr>';
		$(start).appendTo(table);

    // Body
    $.each(data, (index, element) => {
      var row = '<tr align="right">';
			$.each(element, (key, val) => {
        row += '<td align="right"> ' + val + '</td>';
			});
			row += '</tr>';

      $(table).append(row);
		});

    $(table).append('</thead></table>');
    $("#tableF1").html(table);
    console.log(status);
  });


  request.always(function(jqXHR, status, statusText) {
    console.log(status);
   	   	if (status=="error"){
      $("#tableF1").html("No data load");
   	}
  });

});
