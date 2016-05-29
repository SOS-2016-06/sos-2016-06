var arr = [];
$(document).ready(() => {

  var request = $.ajax({
    url: '/api/topten/rating',
    type:"GET",
    contentType: "application/json",
  });


  request.done(function(response) {
    $.each(response, function (i, item) { // Recorremos la respuesta y obtenemos el "i" y cada elemento JSON "item"
      arr.push({"first_name":item.first_name, "rating": parseInt(item.rating)});
    });
    var chart = AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "theme": "light",
    "titles": [ {
      "text": "Visitors countries",
      "size": 16
    } ],
    "dataProvider": arr,
    "valueField": "rating",
    "titleField": "first_name",
    "startEffect": "elastic",
    "startDuration": 2,
    "labelRadius": 15,
    "innerRadius": "50%",
    "depth3D": 10,
    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    "angle": 15,
    "export": {
      "enabled": true
    }
  });
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
  });
  });

});
