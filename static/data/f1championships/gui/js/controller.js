var save_method; //for save method string
var searchby ="";
var limit=2;

$( document ).ready(function() {

  $("#button").on("click", (()=>{
    searchby = "";
    loadInitialData();
    }));

    $("#table").on('click','td:nth-child(5) .btn-danger',function(event) {
      console.log("OK");
    var apikey=$("#apikey").val();
    var $td= $(this).closest('tr').children('td');
    var country= $td.eq(3).text();
    var year= $td.eq(1).text();

    //Ajax Load data from ajax
    $.ajax({
        url : "/api/v1/f1championships/"+country+"/"+year+"?apikey="+apikey,
        type: "DELETE",
        dataType: "JSON",
        error: function (jqXHR, textStatus, errorThrown)
    {
        if(jqXHR.status==403)
            alert("The user has not write access. Try with another apikey");
        $('#btnSave').text('save'); //change button text
        $('#btnSave').attr('disabled',false); //set button enable
    }

    });
    functionLOAD();
});

});


function functionLOAD() {

  $("#table td").remove();
  var apikey=$("#apikey").val();
  var table = [];
  var urlend = "";

$.ajax({
    type: "GET",
    url: '/api/v1/f1championships?apikey=' + apikey + urlend,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
        var trHTML = '';
        $.each(response, function (i, item) {
            table.push([item.motor,item.year,item.pilot,item.country,item.wins]);
        });
        var rows=$(table).length;
        var offset=0;
        var total=Math.ceil(rows/limit);
        
        $('#page-selection').bootpag({
           total: total,
           page: 1,
           maxVisible: 5
        }).on('page', function(event, num){
            $("#table td").remove();
            urlend = "";
            if(searchby=="gold" & $("#search").val())
                    urlend = "&goldmedalsnumber="+$("#search").val();
            else if(searchby=="silver" & $("#search").val())
                    urlend = "&silvermedalsnumber="+$("#search").val();
            $.ajax({
                    type: "GET",
                    url: '/api/v1/f1championships?apikey=' + apikey+"&offset="+limit*(num-1)+"&limit="+limit+urlend,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        $("#table td").remove();
                        var trHTML = '';
                        $.each(response, function (i, item) {
                            trHTML += '<tr><td>' + item.motor + '</td><td>' + item.year + '</td><td>' + item.pilot + '</td><td>'  + item.country + '</td><td>'+ item.wins +'</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
                        });
                        $('#table').append(trHTML);
                    }
        });

        });
            }
        });
}

function loadInitialData(){
    $("#table td").remove();
        var apikey=$("#apikey").val();
        $.ajax({
            type: "GET",
            url: '/api/v1/f1championships/loadInitialData?apikey=' + apikey,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var trHTML = '';
                $.each(response, function (i, item) {
                    trHTML += '<tr><td>' + item.motor + '</td><td>' + item.year + '</td><td>' + item.pilot + '</td><td>'  + item.country + '</td><td>'+ item.wins + '</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
                });
                $('#table').append(trHTML);
            }
        });
    functionLOAD();
}
