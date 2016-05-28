var arr1 = [];
var arr2 = [];
var arr3 = [];
$(document).ready(() => {

  var request_06 = $.ajax({
    url: 'https://sos-2016-06.herokuapp.com/api/v1/f1championships?apikey=multiPlan_C1_sos-2016-06-lbb_ag',
    type:"GET",
    contentType: "application/json",
  });

  var request_04 = $.ajax({
    url: 'http://sos-2016-04.herokuapp.com/api/v1/population-percentage-by-age?apikey=multiPlan_C4_sos-2016-04-jmt_ag',
    type:"GET",
    contentType: "application/json",
  });

  request_06.done(function(response) {
    $.each(response, function (i, item) { // Recorremos la respuesta y obtenemos el "i" y cada elemento JSON "item"
      arr1.push({"country":item.country, "year2004": item.year});
    });

    request_04.done(function(response) {
      $.each(response, function (i, item) { // Recorremos la respuesta y obtenemos el "i" y cada elemento JSON "item"
        if((item.country == "spain" && item.year == 2011) || (item.country == "canada" && item.year == 2008) ||
            (item.country == "brazil" && item.year == 2006) || (item.country == "france" && item.year == 2015) ||
            (item.country == "russia" && item.year == 2012)){
              arr2.push({"country":item.country, "year2005": item.year});
        }
      });
      for(i=0;i<arr1.length;i++){
        for(j=0;j<arr2.length;j++){
          if(arr1[i].country == arr2[j].country){
            data3={"country":arr1[i].country, "year2004": arr1[i].year2004, "year2005": arr2[j].year2005};
            arr3.push(data3);
          }
        }
      }
      var chart = AmCharts.makeChart("chartdiv", {
    "theme": "light",
    "type": "serial",
    "dataProvider": arr3,
    "valueAxes": [{
        "stackType": "3d",
        "unit": "%",
        "position": "left",
        "title": "GDP growth rate",
    }],
    "startDuration": 1,
    "graphs": [{
        "balloonText": " [[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "title": "2004",
        "type": "column",
        "valueField": "year2004"
    }, {
        "balloonText": " [[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "title": "2005",
        "type": "column",
        "valueField": "year2005"
    }],
    "plotAreaFillAlphas": 0.1,
    "depth3D": 60,
    "angle": 30,
    "categoryField": "country",
    "categoryAxis": {
        "gridPosition": "start"
    },
    "export": {
    	"enabled": true
     }
});
jQuery('.chart-input').off().on('input change',function() {
	var property	= jQuery(this).data('property');
	var target		= chart;
	chart.startDuration = 0;

	if ( property == 'topRadius') {
		target = chart.graphs[0];
      	if ( this.value == 0 ) {
          this.value = undefined;
      	}
	}

	target[property] = this.value;
	chart.validateNow();
});
    });
  });
});
