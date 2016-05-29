
$(document).ready(() => {

  var request_06 = $.ajax({
    url: 'https://sos-2016-06.herokuapp.com/api/v1/f1championships?apikey=multiPlan_C1_sos-2016-06-lbb_ag',
    type:"GET",
    contentType: "application/json",
  });

  var request_08 = $.ajax({
    url: 'https://sos-2016-08.herokuapp.com/api/v1/social_situation/?apikey=multiPlan_C4_sos-2016-08-cmg_ag',
    type:"GET",
    contentType: "application/json",
  });

  var dataW = [['Country','Year']]; // Cabezera

  request_06.done(function(response) {
    $.each(response, function (i, item) { // Recorremos la respuesta y obtenemos el "i" y cada elemento JSON "item"
        dataW.push([item.country,item.year]);
    });

    request_08.done(function(response) {
      $.each(response, function (i, item) {
          dataW.push([item.country,item.year]);
      });


        // Widget Google Chart
        google.charts.load('current', {'packages': ['geochart']});
        google.charts.setOnLoadCallback(drawMarkersMap);

        function drawMarkersMap() {
          var data = google.visualization.arrayToDataTable(dataW);
          var options = {
            displayMode: 'markers',
            colorAxis: {colors: ['green','blue', 'red']}
          };

          var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
          chart.draw(data, options);
        };

    });
  });




});
