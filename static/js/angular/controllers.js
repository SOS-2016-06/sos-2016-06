
var read =""
var write = ""
var offset = 0
var limit = 4
var currentPage = 0
var total = 0

app.controller("searchTable", function appController($scope, $http, $location){
		$scope.olympicsgames = [];
		$scope.currentPage = currentPage

		$scope.noAPIKEY = true


		
		$scope.range = function(){

			return $scope.init
		}



		if (read != ""){

			 	var request =$http.get('/api/v1/olympicsgames?apikey='+read)

			 	request.success(function(data) {
			 		total = Math.ceil(data.length/limit)
		            //$scope.olympicsgames = data;
		            $scope.init = Array.apply(null, Array(Math.ceil(data.length/limit))).map(function (_, i) {return i;});
		            
		            
		            
		        });
		        request.error(function(data, status, headers, config) {
		            
		            $location.url("/error/"+status);
		            

		           
		        });



		        var request =$http.get('/api/v1/olympicsgames?apikey='+read+'&limit='+limit+'&offset='+offset)

			 	request.success(function(data) {
		         $scope.olympicsgames = data; });
		}


	    $scope.setPage = function(n){

	    	if(currentPage>n){
	    		offset= (n*limit);
	    		currentPage = n;
	    		console.log(">")

	    	}else if(currentPage<n){
	    		offset =(n*limit);
	    		currentPage = n; 
	    		console.log("<")


	    	}else{
	    		offset=offset
	    		currentPage = n
	    		console.log("=")
	    	}
	    	
	    	
	    	

	    	
			
		} 




		$scope.prevPage = function(){
			

			currentPage = currentPage-1; 
			offset= (currentPage*limit);
			


			 var request =$http.get('/api/v1/olympicsgames?apikey='+read+'&limit='+limit+'&offset='+offset)

			 	request.success(function(data) {
		         $scope.olympicsgames = data; });

			 	$scope.currentPage = currentPage


		}

		$scope.nextPage = function(){
			

			currentPage = currentPage+1; 
			offset= (currentPage*limit);

			var request =$http.get('/api/v1/olympicsgames?apikey='+read+'&limit='+limit+'&offset='+offset)

			 	request.success(function(data) {
		         $scope.olympicsgames = data; });

			 	$scope.currentPage = currentPage


		}

		$scope.nextPageDisabled = function() {
    	return $scope.currentPage === total-1 ? "disabled" : "";
  		};


  		$scope.prevPageDisabled = function() {
    	return $scope.currentPage === 0 ? "disabled" : "";
  		};



	       
	      
	    
	
	
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
		$scope.message= " This resource already exists"
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




























