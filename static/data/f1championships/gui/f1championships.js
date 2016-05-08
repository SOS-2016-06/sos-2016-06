var method;
var search ="";
var limit=3;

$(document).ready(function() {

    $("#load").on("click", (()=>{
      search = "";
      loadInitialData();
    }));

    $("#table").on('click','td:nth-child(6) .btn-danger',function(event) {
        var apikey=$("#apikey").val();
        var $td= $(this).closest('tr').children('td');
        var country= $td.eq(3).text();
        var year= $td.eq(1).text();

        $.ajax({
            url : "/api/v1/f1championships/"+country+"/"+year+"?apikey="+apikey,
            type: "DELETE",
            dataType: "JSON",
            error: function (jqXHR, textStatus, errorThrown){
            if(jqXHR.status==403)
                alert("Incorrect Apikey");
            $('#btnSave').text('save');
            $('#btnSave').attr('disabled',false);
          }
        });
        load_table();
    });

    $("#table").on('click','td:nth-child(6) .btn-primary',function(event) {
        method = 'update';
        var $td= $(this).closest('tr').children('td');
        var motor= $td.eq(0).text();
        var year= $td.eq(1).text();
        var pilot= $td.eq(2).text();
        var country= $td.eq(3).text();
        var wins= $td.eq(4).text();
        $('#form')[0].reset();
        $('.form-group').removeClass('has-error');
        $('.help-block').empty();
        $("#country").prop( "disabled", true );
        $("#year").prop( "disabled", true );

        $.ajax({
            url : "/api/v1/f1championships/"+country+"/"+year+"?apikey=userw",
            type: "GET",
            dataType: "JSON",
            success: function(data){
              $("#motor").val(data.motor);
              $("#year").val(data.year);
              $("#pilot").val(data.pilot);
              $("#country").val(data.country);
              $("#wins").val(data.wins);
              $('#modal_form').modal('show');
              $('.modal-title').text('Edit');
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert('Error ajax');
            }
        });
    });
});

function SearchYear(){
      $("#table td").remove();
      var apikey=$("#apikey").val();
      url = "?from=" + $("#from").val() + "&to=" + $("#to").val();
      $.ajax({
          type: "GET",
          url: '/api/v1/f1championships'+url+'&apikey=' + apikey,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (response) {
              var trHTML = '';
              $.each(response, function (i, item) {
                  trHTML += '<tr><td>' + item.motor + '</td><td>' + item.year + '</td><td>' + item.pilot + '</td><td>'  + item.country + '</td><td>'  + item.wins + '</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
              });
              $('#table').append(trHTML);
          }
      });
}

function add(){
    method = 'add';
    $('#form')[0].reset(); // reset form on modals
    $('.form-group').removeClass('has-error'); // clear error class
    $('.help-block').empty(); // clear error string
    $('#modal_form').modal('show'); // show bootstrap modal
    $('.modal-title').text('Add Pilot'); // Set Title to Bootstrap modal title
    $("#country").prop( "disabled", false );
    $("#year").prop( "disabled", false );
}

function load_table(){
        $("#table td").remove();
        var apikey=$("#apikey").val();
        var table = [];
        var url = "";

        if ($("#table td").length/6==0){
            $.ajax({
                type: "GET",
                url: '/api/v1/f1championships'+url+'?apikey=' + apikey+"&offset=0&limit="+limit,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var trHTML = '';
                    $.each(response, function (i, item) {
                        trHTML += '<tr><td>' + item.motor + '</td><td>' + item.year + '</td><td>' + item.pilot + '</td><td>'  + item.country + '</td><td>'  + item.wins + '</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
                    });
                    $('#table').append(trHTML);
                }
            });
        }

        $("#table td").remove();
        $.ajax({
            type: "GET",
            url: '/api/v1/f1championships'+url+'?apikey=' + apikey,
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
                    url = "";
                    if(search=="year" & $("#search").val())
                            url = "/"+$("#search").val();

                    $.ajax({
                            type: "GET",
                            url: '/api/v1/f1championships'+url+'?apikey=' + apikey+"&offset="+limit*(num-1)+"&limit="+limit,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                $("#table td").remove();
                                var trHTML = '';
                                $.each(response, function (i, item) {
                                    trHTML += '<tr><td>' + item.motor + '</td><td>' + item.year + '</td><td>' + item.pilot + '</td><td>'  + item.country + '</td><td>' + item.wins + '</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
                                });
                                $('#table').append(trHTML);
                            }
                          });
                        });
                      }
                    });
                  }

function save(){
    var apikey=$("#apikey").val();
    $('#btnSave').text('saving...');
    $('#btnSave').attr('disabled',true);
    var country = $("#country").val();
    var year = $("#year").val();
    var motor = $("#motor").val();
    var pilot = $("#pilot").val();
    var wins = $("#wins").val();

    if(method == 'add') {
         $.ajax({
        url : "/api/v1/f1championships?apikey="+apikey,
        type: "POST",
        data: '[{ "motor": "' + motor + '", "year": "' + year + '", "pilot": "' + pilot +
        '", "country": "' + country + '", "wins": "' + wins +'"}]',
          contentType: "application/json",

        success: function(data){
          console.log(data);
            $('#modal_form').modal('hide');
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
        },

        error: function (jqXHR, textStatus, errorThrown){
            if(jqXHR.status==409)
                alert("Conflict: resource already exists");
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
        }
    });
    } else {
        $.ajax({
        url : "/api/v1/f1championships/"+country+"/"+year+"?apikey="+apikey,
        type: "PUT",
        data: '[{ "motor": "' + motor + '", "year": "' + year + '", "pilot": "' + pilot +
        '", "country": "' + country + '", "wins": "' + wins +'"}]',
        contentType: "application/json",

        success: function(data){
            $('#modal_form').modal('hide');
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
        },
        error: function (jqXHR, textStatus, errorThrown){
            if(jqXHR.status==404)
                alert("Not Found!");
            else if(jqXHR.status==403)
                alert("Incorrect Apikey");
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
        }
      });
    }
    load_table();
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
                    trHTML += '<tr><td>' + item.motor + '</td><td>' + item.year + '</td><td>' + item.pilot + '</td><td>'  + item.country + '</td><td>'  + item.wins + '</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
                });
                $('#table').append(trHTML);
            },
            error: function (jqXHR, textStatus, errorThrown){
              if(jqXHR.status==403)
                    alert("Incorrect Apikey");
            }
        });
    load_table();
}
