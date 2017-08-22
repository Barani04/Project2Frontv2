/**
 * 
 */

app.controller('AuthController',function(AuthService,$scope,$rootScope,$location,$cookieStore){
	$scope.user={}
	
	$scope.registerUser=function(){
		AuthService.registerUser($scope.user).then(function(response) {
			$rootScope.message='Registered Successfully...please login'
			$location.path('/login')	
		},function(response){
			console.log(response.status)
			console.log(response.data)
			$scope.error=response.data
			$location.path('/signup')
		})
	}
	
	$scope.validateUser=function(){
		AuthService.validateUser($scope.user).then(function(response) {
			console.log(response.data)
			$rootScope.currentUser=response.data
			$cookieStore.put("currentUser",response.data)
			Materialize.toast('Logged In Successfully..!',3000);
			$location.path('/home')
		},function(response){
			$scope.error = response.data
			console.log(response.status)
			$location.path('/login')
		})
	}
	
})