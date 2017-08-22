/**
 * 
 */

app.controller('BlogController',function(BlogService,$scope,$location,$route,$rootScope,$cookieStore){
	
	BlogService.getBlogsWaitingForApproval().then(function(response){
		if(response.data.length==0){
			$scope.mess="No New Blogs for Approval...!"
		}
		$rootScope.len=response.data.length;
		$cookieStore.put("len",response.data.length)
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
	
	
	$scope.changeblogStatus=function(id){
	BlogService.changeblogStatus(id).then(function(response){
		$scope.changeblogStatus = response.data;
		Materialize.toast('Blog Approved..!',3000);
		$route.reload();
	},function(response){
		$scope.error=response.data
		$location.path('/home')
	})
	}
	
	$scope.addBlog=function(){
		BlogService.addBlog($scope.blog).then(function(response){
			console.log(response.status)
			Materialize.toast('Blog Created..!Waiting for approval', 3000);
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
	
	$scope.getBlog=function(id){
		BlogService.getBlog(id).then(function(response){
			$scope.getBlog=response.data;
			$location.path('/viewBlog')
		},function(response){
			if(response.status==401){
				$scope.error=response.data
				$location.path('/home')
			}
		})
	}
})