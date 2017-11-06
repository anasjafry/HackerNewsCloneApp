   angular.module("hackerNewsDemoApp", [])
   
   .controller("storiesController", function($scope, $http) {
	   
	   //Viewing or Listed
	   $scope.isViewing = false;
	   $scope.viewContent = "";
	   $scope.viewStory = function(story){
		   $scope.viewContent = story;
		   $scope.isViewing = true;
	   }
	   
	   $scope.resetView = function(){
		   	$scope.isViewing = false;
			$scope.viewContent = "";
	   }
	   
	   
	   
	   
	   //Set the Type of Stories - New or Best or Top Stories
	   $scope.storyFilterType = 'TOP';	   
	   $scope.setFilter = function(type){
		   $scope.storyFilterType = type;
	   }
	   
	   
		
	   //Fetch Stories 
	   $scope.storiesList = "";
	   $scope.initStories = function(){
			
			var API_URI = 'https://hacker-news.firebaseio.com/v0/topstories.json';
			
			switch($scope.storyFilterType){
				case 'NEW':{
					API_URI = 'https://hacker-news.firebaseio.com/v0/newstories.json';
					break;
				}
				case 'BEST':{
					API_URI = 'https://hacker-news.firebaseio.com/v0/beststories.json';
					break;
				}	
				case 'TOP':{
					API_URI = 'https://hacker-news.firebaseio.com/v0/topstories.json';
					break;
				}					
				default:{ //Top Stories by Default
					API_URI = 'https://hacker-news.firebaseio.com/v0/beststories.json';
				}
			}
	   
			$http.get(API_URI)
			.then(function(response) {
				$scope.storiesList = response.data;
			}, function() {
				$scope.errorMessage = "Something went wrong.";
			});		   
	   }
	   
	   $scope.initStories();
   });