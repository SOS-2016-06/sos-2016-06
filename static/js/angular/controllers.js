
var read =""
var write = ""
app.controller("searchTable", function appController($scope, $http, $location){
		$scope.olympicsgames = [];
		$scope.noAPIKEY = true
		if (read != ""){
			$scope.noAPIKEY = false
		 	var request =$http.get('/api/v1/olympicsgames?apikey='+read)

		 	request.success(function(data) {
	            $scope.olympicsgames = data;
	        });
	        request.error(function(data, status, headers, config) {
	            
	            $location.url("/error/"+status);
	            

	           
	        });
	       }
	    
	
	
})


app.controller("initAPI", function initAPI($scope,$location){
			
	$scope.apiread = read
	$scope.apiwrite = write
	$scope.changeAPI = function(){
		read =  $scope.apiread
		write = $scope.apiwrite
		$location.url("/");
		
		
	}

})


app.controller("statusError", function initAPI($scope,$location,$routeParams){
			
	var status = $routeParams.status

	if(status =="404"){
		$scope.message= " Not found, try later"

	}else if (status =="403"){
		$scope.message= " You APIKEY isn't allowed, please correct you"
	}else if (status =="409"){
		$scope.message= " Exist this resource yet"
	}else if (status =="401"){
		$scope.message= " You cannot access to olympicsgames API"
	}else if (status =="400"){
		$scope.message= " You cannot update neither city nor year "
	}
	
	


})




app.controller("infoOlympic", function infoOlympic($scope,$routeParams,$location, $http){
	var city = $routeParams.city
	var year = $routeParams.year
			var request =$http.get('/api/v1/olympicsgames/'+city+'/'+year+'?apikey='+read)
	

		 	request.success(function(data) {
	            $scope.olympic = data;

	        });
	        request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });


	
});


app.controller("addOlympic", function addOlympic($scope,$location,$http){
	$scope.textButton = "Add Olympic";
	$scope.olympic = {};
	$scope.load = function(){
var request =$http.get('/api/v1/olympicsgames/loadInitialData?apikey='+write)

		 	request.success(function(data) {
	            $scope.olympicsgames = data;
	        });
	        request.error(function(data, status, headers, config) {
	            
	            $location.url("/error/"+status);
	            

	           
	        });


	}


	$scope.newUser = function(){

			

			var datasend = {
				city: $scope.olympic.city ,
				year: $scope.olympic.year ,
				sportsnumber: $scope.olympic.sportsnumber,
				athletes:  $scope.olympic.athletes,
				modality: $scope.olympic.modality

			}


			

		
			var request =$http.post('/api/v1/olympicsgames/?apikey='+write, datasend)
	

		 	request.success(function(data) {
		 		$location.url("/");
	            
	        });
	        request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });


		
	}
})

app.controller("editOlympic", function editOlympic($scope,$routeParams,$location,$http){
	
	$scope.textButton = "Edit olympic";


		var city = $routeParams.city
		var year = $routeParams.year
		var request =$http.get('/api/v1/olympicsgames/'+city+'/'+year+'?apikey='+read)
	

		request.success(function(data) {
	            $scope.olympic = data;
	        });
	    request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });


	$scope.editUser = function(){
		
		var datasend = {
				city: $scope.olympic.city ,
				year: $scope.olympic.year ,
				sportsnumber: $scope.olympic.sportsnumber,
				athletes:  $scope.olympic.athletes,
				modality: $scope.olympic.modality

			}

		
			var request =$http.put('/api/v1/olympicsgames/'+city+'/'+year+'/?apikey='+write, datasend)
	

		 	request.success(function(data) {
		 		$location.url("/");
	            
	        });
	        request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });



	}
})

//eliminamos el usuario dependiendo de su id
app.controller("removeOlympic", function removeOlympic($scope,$routeParams,$location,$http){
	


		var city = $routeParams.city
		var year = $routeParams.year
		var request =$http.get('/api/v1/olympicsgames/'+city+'/'+year+'?apikey='+read)
	

		request.success(function(data) {
	            $scope.olympic = data;
	        });
	    request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });


	$scope.removeUser = function(){
		

			var request =$http.delete('/api/v1/olympicsgames/'+city+'/'+year+'/?apikey='+write)
	

		 	request.success(function(data) {
		 		$location.url("/");
	            
	        });
	        request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });



	}
});






app.controller("searchctrl", function searchctrl($scope,$location,$http){
	
	$scope.textButton = "Search  olympic";

	$scope.searcholympic =[]
		
	$scope.searchavanced = function(){
		var from = $scope.from
		var to = $scope.to
		var request =$http.get('/api/v1/olympicsgames/?apikey='+read+'&from='+from+'&to='+to)
	

		request.success(function(data) {
	            $scope.searcholympic = data;
	        });
	    request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });
		
	        



	}




})





















function get(http,location,offset, limit){
				var items=[]

    		var request =http.get('/api/v1/olympicsgames?apikey=user&offset='+offset+'&limit='+limit)
    		
		 	request.success(function(data) {
		 		
	            items = data;
	            
	        });
	        request.error(function(data, status, headers, config) {
	             
	            location.url("/error/"+status);

	        });


	        for (var i = 0; i <= 100; i++) {
    				i 
    			};

    		console.log("entra")	

	        return items;

}


function total(http,location){


var request = http.get('/api/v1/olympicsgames?apikey=user')
			var items = []
		 	request.success(function(data) {
		 		 
	             items= data;
	             
	        });
	        request.error(function(data, status, headers, config) {
	             var items= [];
	            location.url("/error/"+status);
	            

	           
	        });
	            for (var i = 0; i <= 100; i++) {
    			i 
    				};

	        return items.length;

}





app.controller("PaginationCtrl", function PaginationCtrl($scope, $http,$location) {

  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;

  $scope.range = function() {
    var rangeSize = 3;
    var ret = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
  };


  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount() - 1) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.total/$scope.itemsPerPage);
  };

  $scope.setPage = function(n) {
    if (n > 0 && n < $scope.pageCount()) {
      $scope.currentPage = n;
    }
  };

  $scope.$watch("currentPage", function(newValue, oldValue) {

  	
  		  function getData() {
	    	$http.get("/api/v1/olympicsgames?apikey=user")
	      .then(function(response) {
	        $scope.total = response.data.length
	        angular.copy(response.data, $scope.pagedItems)


      });

	      $scope.changue = function(){
	      	getData()
	      }
	      
	  }


  	//var items = get($http,$location,newValue*$scope.itemsPerPage, $scope.itemsPerPage);
  	//var total1 =total($http,$location);


  	 

   

  });

});
