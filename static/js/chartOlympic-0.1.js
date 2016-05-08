$(document).ready(function(){


      var request = $.ajax({
      url: '/api/v1/olympicsgames?apikey=user',
      type:"GET",
      contentType: "application/json",
      
      
    });


      request.done(function(dataJson) {
          //console.log(dataJson)
          

      google.charts.load('current', {'packages': ['geochart']});
     google.charts.setOnLoadCallback(drawMarkersMap);




      function drawMarkersMap() {

        var dataresult = [['Cities','Athletes']];
      
       
      
      
     for (var i in dataJson){

           item = dataJson[i];
           
           var itemforwidget = [item.city, item.athletes]
           dataresult.push(itemforwidget)

      }
         


      var data = google.visualization.arrayToDataTable(dataresult);

      var options = {
       
        displayMode: 'markers',
        colorAxis: {colors: ['blue', 'green','red']}
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    };
          

    } );


     });  
