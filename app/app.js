   angular.module("hackerNewsDemoApp", ['ngSanitize'])
   
   .controller("storiesController", function($scope, $http) {
	   
	   //Viewing or Listed
	   $scope.comments = []
	   $scope.isViewing = false;
	   $scope.viewContent = "";
	   $scope.moreflag = true;

	   $scope.viewStory = function(story){
		   $scope.viewContent = story;
		   $scope.isViewing = true;
		   var i = 0;
		   var x = story.detail.kids;
	       while(i < x.length){
	         	$http.get('https://hacker-news.firebaseio.com/v0/item/'+x[i]+'.json')
				.then(function(response) {
					$scope.commentDetail = response.data;
					$scope.timeStamp = $scope.timeConverter($scope.commentDetail.time);
					$scope.comments.push({detail:$scope.commentDetail,stdtime:$scope.timeStamp});

				}, function() {
				 	$scope.errorMessage = "Something went wrong.";
				});
		        i++;
	        }
	        console.log($scope.comments);

	   }
	   
	   $scope.resetView = function(){
		   	$scope.isViewing = false;
			$scope.viewContent = "";
	   }
	   
	   
		$scope.timeConverter = function(UNIX_timestamp){
		  var a = new Date(UNIX_timestamp * 1000);
		  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		  var year = a.getFullYear();
		  var month = months[a.getMonth()];
		  var date = a.getDate();
		  var hour = a.getHours();
		  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
		  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
		  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		  return time;
		}

	   
	   //Set the Type of Stories - New or Best or Top Stories
	   $scope.storyFilterType = 'TOP';	   
	   $scope.setFilter = function(type){
	   		$scope.isViewing = false;
			$scope.viewContent = "";
		    $scope.storyFilterType = type;
		    $scope.stories = [];
		    $scope.initStories();
	   }
	   
	   
		var current = 0;
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
					API_URI = 'https://hacker-news.firebaseio.com/v0/topstories.json';
				}
			}
	   
			$http.get(API_URI)
			.then(function(response) {
				$scope.storiesList = response.data;
				$scope.loadStories();
				//console.log($scope.storiesList[0]);
			}, function() {
				$scope.errorMessage = "Something went wrong.";
			});		   
			//console.log($scope.storiesList);
	   		
	   }
	   $scope.stories = [];
	   $scope.loadStories = function(){
	    	var i = 0;
	        while(i < 30){
	        	$http.get('https://hacker-news.firebaseio.com/v0/item/'+$scope.storiesList[i]+'.json')
				.then(function(response) {
					$scope.storiesDetail = response.data;
					$scope.timeStamp = $scope.timeConverter($scope.storiesDetail.time);
					$scope.stories.push({detail:$scope.storiesDetail,stdtime:$scope.timeStamp});
				}, function() {
					$scope.errorMessage = "Something went wrong.";
				});
		        i++;
	        }
	        current = i;
	        //console.log($scope.stories);
	   }

	   $scope.loadmore = function(){
	   		var more = 0;
	   		more = current + 30;
	        more = more <  $scope.storiesList.length ? more :  $scope.storiesList.length;
	        if($scope.storiesList.length <= (current + 60)){
	        	$scope.moreflag = false;
	        }
	        while(current < more){
	        	$http.get('https://hacker-news.firebaseio.com/v0/item/'+$scope.storiesList[current]+'.json')
				.then(function(response) {
					$scope.storiesDetail = response.data;
					$scope.timeStamp = $scope.timeConverter($scope.storiesDetail.time);
					$scope.stories.push({detail:$scope.storiesDetail,stdtime:$scope.timeStamp});
					//$scope.stories.push($scope.storiesDetail);
				}, function() {
					$scope.errorMessage = "Something went wrong.";
				});
		        current++;
	        }

	   }


	   $scope.initStories();
   });