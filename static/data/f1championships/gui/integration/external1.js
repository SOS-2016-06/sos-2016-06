
$(document).ready(() => {

  var request = $.ajax({
    url: '/1.0/population/2015/Spain',
    type:"GET",
    contentType: "application/json",
  });

  var dataW = [['Age','Total']]; // Cabezera

  request.done(function(response) {
    $.each(response, function (i, item) { // Recorremos la respuesta y obtenemos el "i" y cada elemento JSON "item"
        dataW.push([item.age,item.total]);
    });
  });

  // Widget Google Chart
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(dataW);

    var options = {
      title: 'Company Performance',
      hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chartdiv'));
    chart.draw(data, options);
  }

});
