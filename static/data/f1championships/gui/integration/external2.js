var arr = [];
$(document).ready(() => {

  var request = $.ajax({
    url: '/rest/v1/currency/eur',
    type:"GET",
    contentType: "application/json",
  });


  request.done(function(response) {
    $.each(response, function (i, item) { // Recorremos la respuesta y obtenemos el "i" y cada elemento JSON "item"
      arr.push({"capital":item.capital, "population": parseInt(item.population)});
    });

      var chart = AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "theme": "light",
    "dataProvider": arr,
    "valueField": "population",
    "titleField": "capital",
    "outlineAlpha": 0.4,
    "depth3D": 15,
    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    "angle": 30,
    "export": {
      "enabled": true
    }
  } );
  jQuery( '.chart-input' ).off().on( 'input change', function() {
    var property = jQuery( this ).data( 'property' );
    var target = chart;
    var value = Number( this.value );
    chart.startDuration = 0;

    if ( property == 'innerRadius' ) {
      value += "%";
    }

    target[ property ] = value;
    chart.validateNow();
  } );

  });

});
