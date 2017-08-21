/**
 * 
 */

app.controller('BlogController',function(BlogService,$scope,$location){
	
	BlogService.getBlogsWaitingForApproval().then(function(response){
		$scope.blogsWaitingForApproval = response.data;
	},function(response){
		if(response.status==401){
			$scope.error=response.data
			$location.path('/login')
		}
	})
	
	BlogService.getBlogsApproved().then(function(response){
		$scope.blogsApproved = response.data;
	},function(response){
		if(response.status==401){
			$scope.error=response.data
			$location.path('/login')
		}
	})
	
	$scope.addBlog=function(){
		BlogService.addBlog($scope.blog).then(function(response){
			console.log(response.status)
			alert("Blog submitted Successfully...!Waiting for approval")
			$location.path("/getallblogs")
		},function(response){
			if(response.status==401){
				$scope.error=response.data
				$location.path('/home')
			}
			
			if(response.status==500){
				$scope.error=response.data
				$location.path('/addblog')
			}
			$location.path('/home')
		})
	}
})