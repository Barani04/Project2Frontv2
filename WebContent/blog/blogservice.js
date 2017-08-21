/**
 * 
 */

app.factory('BlogService',function($http){
	var blogService={}
	
	var BASE_URL="http://localhost:8081/Project2back"
	
	blogService.addBlog=function(blog){
		return $http.post(BASE_URL+"/saveblog",blog)
	}
	
	blogService.getBlogsWaitingForApproval=function(){
		return $http.get(BASE_URL+"/getblogs/"+0)
	}
	
	blogService.getBlogsApproved=function(){
		return $http.get(BASE_URL+"/getblogs/"+1)
	}
	
	return blogService;
})