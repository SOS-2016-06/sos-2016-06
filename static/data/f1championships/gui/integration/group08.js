var request_06 = $.ajax({
  url: '/api/v1/f1championships?apikey=multiPlan_C1_sos-2016-06-lbb_ag',
  type:"GET",
  contentType: "application/json",
});

var request_08 = $.ajax({
  url: '/api/v1/music?apikey=multiPlan_C5_sos-2016-08-bhl_ag',
  type:"GET",
  contentType: "application/json",
});

request_06.done(function(response) {
  google.charts.load('current', {'packages': ['geochart']});
  google.charts.setOnLoadCallback(drawMarkersMap);

  function drawMarkersMap() {
    var f1 = [['City','Wins']];

    $.each(response, function (i, item) {
        f1.push([item.country,item.wins]);
    });

    var data = google.visualization.arrayToDataTable(f1);

    var options = {
      displayMode: 'markers',
      colorAxis: {colors: ['green', 'blue']}
    };

    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  };
});
