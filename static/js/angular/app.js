
var app = angular.module("app", []);


app.config(function($routeProvider){
	$routeProvider.when("/", {
		templateUrl : "templates/index.html"
	})
	
	.when('/info/:city/:year', {
      templateUrl : "templates/info.html",
     controller : "infoOlympic"
    })
	.when("/add", {
		title: 'add olympic',
		templateUrl : "templates/add.html",
		controller : "addOlympic"
	})
	.when("/edit/:city/:year", {
		title: 'edit olympic',
		templateUrl : "templates/edit.html",
		controller : "editOlympic"
	})
 	.when("/remove/:city/:year", {
 		title: 'remove olympic',
 		templateUrl : "templates/remove.html",
 		controller : "removeOlympic"
 	})
 	.when("/setupAPIKEY/", {
 		title: 'Set Up APIKEY',
 		templateUrl : "templates/setup.html",
 		controller : "initAPI"
 	})
 	.when("/error/:status", {
 		title: 'Error APIKEY',
 		templateUrl : "templates/error.html",
 		controller : "statusError"
 	})
 	.when("/test", {
 		title: 'Pagination APIKEY',
 		templateUrl : "templates/index2.html",
 		controller : "PaginationCtrl"
 	})
 	.when("/search", {
 		title: 'search',
 		templateUrl : "templates/search.html",
 		controller : "searchctrl"
 	})
 	.otherwise({ redirectTo : "/"})
})
