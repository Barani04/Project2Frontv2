/**
 * 
 */

var app=angular.module("myApp",['ngRoute','ngCookies'])
app.config(function($routeProvider) {
	$routeProvider
	.when('/home',{
		templateUrl:'views/home.html'
	})
	.when('/signup',{
		templateUrl:'auth/signup.html',
		controller:'AuthController'
	})
	.when('/login',{
		templateUrl:'auth/login.html',
		controller:'AuthController'
	})
	.when('/editprofile',{
		templateUrl:'user/updateprofile.html',
		controller:'UserController'
	})
	.when('/jobform',{
		templateUrl:'job/jobform.html',
		controller:'JobController'
	
	})
	
	.when('/getalljobs',{
		templateUrl:'job/jobspage.html',
		controller:'JobController'
	
	})
	
	.when('/addblog',{
		templateUrl:'blog/blogform.html',
		controller:'BlogController'
	
	})
	.when('/getallBlogs',{
		templateUrl:'blog/blogslist.html',
		controller:'BlogController'
	
	})
	
	.otherwise({
		templateUrl:'views/home.html'
	})
	
})
app.run(function(AuthService,$rootScope,$cookieStore,$location) {
	if($rootScope.currentUser==undefined){
		$rootScope.currentUser = $cookieStore.get("currentUser")
	}
		$rootScope.logout=function(){
			AuthService.logout().then(function(response) {
			$rootScope.message='Logged Out Successfully'
				delete $rootScope.currentUser
				$cookieStore.remove("currentUser")
				$location.path('/login')
		},function(response){
			$scope.error=response.data
			$location.path('/login')
		})
	}
})