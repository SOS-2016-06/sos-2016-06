
var read ="user" //deprecated
var write = "multiPlan_C2_sos-2016-06-jern_ag"
var offset = 0
var limit = 4
var currentPage = 0
var total = 0

app.controller("searchTable", function appController($scope, $http, $location){
		$scope.olympicsgames = [];
		$scope.currentPage = currentPage

		$scope.noAPIKEY = true


		

		//calculate total resource
		var request =$http.get('/api/v1/olympicsgames?apikey='+write)

		request.success(function(data) {
		total = Math.ceil(data.length/limit)

		//create array number pags ie 0,1,2,3
		$scope.init = Array.apply(null, Array(Math.ceil(data.length/limit))).map(function (_, i) {return i;});
		});


		request.error(function(data, status, headers, config) {
		 $location.url("/error/"+status);
		  });



		        
	var request =$http.get('/api/v1/olympicsgames?apikey='+write+'&limit='+limit+'&offset='+offset)

			 	request.success(function(data) {
		         $scope.olympicsgames = data; });
		

		//Set page to n page


	    $scope.setPage = function(n){

	    	//set global var

	    	//offset always is calculated

	    	//currentpage always is n here 

	    	if(currentPage>n || currentPage<n){
	    		offset= (n*limit);
	    		currentPage = n;
	    		console.log(">")

	    	}else{
	    		offset=offset
	    		currentPage = n
	    		console.log("=")
	    	}
	    	
	    	
	    	

	    	
			
		}; 




		$scope.prevPage = function(){
			
			//if not the first
			if ((currentPage-1)>=0) {

				//Current decreases in 1

				currentPage = currentPage-1; 
				offset= (currentPage*limit);
				
				//request and change olimpicsgames(it is the fundamental scope)

				 var request =$http.get('/api/v1/olympicsgames?apikey='+write+'&limit='+limit+'&offset='+offset)

				 	request.success(function(data) {
			         $scope.olympicsgames = data; });

				 	$scope.currentPage = currentPage
				 }


		}

		$scope.nextPage = function(){

			//if not the last
			
			if ((currentPage+1)<=(total-1))

				//Current increases in 1
				//
				currentPage = currentPage+1; 
				offset= (currentPage*limit);


				//request and change olimpicsgames(it is the fundamental scope)

				var request =$http.get('/api/v1/olympicsgames?apikey='+write+'&limit='+limit+'&offset='+offset)

				 	request.success(function(data) {
			         $scope.olympicsgames = data; });

				 	$scope.currentPage = currentPage


		}


		//Control class materialize
		$scope.nextPageDisabled = function() {
    	return $scope.currentPage === total-1 ? "disabled" : "";
  		};


  		$scope.prevPageDisabled = function() {
    	return $scope.currentPage === 0 ? "disabled" : "";
  		};



	       
	      
	    
	
	
})


app.controller("initAPI", function initAPI($scope,$location){
			
	
	$scope.apiwrite = write
	$scope.changeAPI = function(){
		
		write = $scope.apiwrite
		$location.url("/");
		
		
	}

})


app.controller("statusError", function initAPI($scope,$location,$routeParams){
	//make params url	
	var status = $routeParams.status

	if(status =="404"){
		$scope.message= " Not found, try later"

	}else if (status =="403"){
		$scope.message= " You APIKEY isn't allowed. Correct your api, please"
	}else if (status =="409"){
		$scope.message= " This resource already exists"
	}else if (status =="401"){
		$scope.message= " You cannot access to olympicsgames API"
	}else if (status =="400"){
		$scope.message= " You cannot update neither city nor year "
	}else if (status =="402"){
		$scope.message= " You must pay for use API "
	}
	
	


})




app.controller("infoOlympic", function infoOlympic($scope,$routeParams,$location, $http){
	//make params url
	var city = $routeParams.city
	var year = $routeParams.year
			var request =$http.get('/api/v1/olympicsgames/'+city+'/'+year+'?apikey='+write)
	

		 	request.success(function(data) {
	            $scope.olympic = data;

	        });
	        request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });


	
});


app.controller("addOlympic", function addOlympic($scope,$location,$http){
	$scope.textButton = "Add Olympic";
	$scope.olympic = {};//init empty object. after add here

	//here load data because load is add

	$scope.load = function(){
var request =$http.get('/api/v1/olympicsgames/loadInitialData?apikey='+write)

		 	request.success(function(data) {

	            $scope.olympicsgames = data;
	            $location.url("/");
	        });
	        request.error(function(data, status, headers, config) {
	            
	            $location.url("/error/"+status);
	            

	           
	        });


	}


	//send post with data


	$scope.newolympic = function(){

			

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

	//first search and after edit



		var city = $routeParams.city
		var year = $routeParams.year
		var request =$http.get('/api/v1/olympicsgames/'+city+'/'+year+'?apikey='+write)
	

		request.success(function(data) {
	            $scope.olympic = data;
	        });
	    request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });


	$scope.editOlympic = function(){
		
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
	
		//first search and after remove

		var city = $routeParams.city
		var year = $routeParams.year
		var request =$http.get('/api/v1/olympicsgames/'+city+'/'+year+'?apikey='+write)
	

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
		var request =$http.get('/api/v1/olympicsgames/?apikey='+write+'&from='+from+'&to='+to)
	

		request.success(function(data) {
	            $scope.searcholympic = data;
	        });
	    request.error(function(data, status, headers, config) {
	          
	            	$location.url("/error/"+status);
	          
	        });
}

})




























