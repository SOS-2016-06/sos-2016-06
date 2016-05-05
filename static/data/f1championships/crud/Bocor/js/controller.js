var save_method; //for save method string
var searchby ="";
var limit=2;

$( document ).ready(function() {

  $("#button").on("click", (()=>{
    searchby = "";
    functionLOAD();
    }));


$("#apikey").on("keypress", ((e)=>{
    if(e.which == 13) { // Press Intro
        searchby = "";
        functionLOAD();
    }
}));
});


function functionLOAD() {
    var request = $.ajax({
      url: '/api/v1/f1championships/loadInitialData?apikey='+document.getElementById("apikey").value,
      type:"GET",
      contentType: "application/json",
    });

    request.done(function(data,status,jqXHR) {
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
    });
    request.always(function(jqXHR, status, statusText) {
          if (status=="error"){
        $("#tableF1").html("No data load");
      }
    });
}
