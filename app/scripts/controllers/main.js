'use strict';

/**
 * @ngdoc function
 * @name springboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the springboardApp
 */
angular.module('springboardApp')
  .controller('MainCtrl', function ($scope,$filter,path) {
   $scope.total_hours = 0;
   $scope.total_upvotes = 0;
   $scope.total_downvotes = 0;
   $scope.total_learners = 0;
    path.getPaths().then(function(result){
    	$scope.paths = result.data.paths;
    	angular.forEach($scope.paths, function(path, key){
    		if(key==0){
    			$scope.tags = path.tags.split(',')
    		}
    		else{
    			$scope.tags_append = path.tags.split(',')
    		}
    		Array.prototype.push.apply($scope.tags, $scope.tags_append);
    		path.hours = parseInt(path.hours);
    		if(window.localStorage.getItem(path.id)===null){
    			window.localStorage.setItem(path.id,JSON.stringify({'upvote':0,'downvote':0}));
    			path.upvote = 0;
    			path.downvote = 0;
    		}
    		else{
    			var vote = JSON.parse(window.localStorage.getItem(path.id));
    			path.upvote = vote.upvote;
    			path.downvote = vote.downvote;

    		}
    		$scope.total_upvotes += path.upvote;
    		$scope.total_downvotes += path.downvote;
    		$scope.total_hours += parseInt(path.hours);
    		$scope.total_learners += parseInt(path.learner.replace(/,/g, ""));
    	});
    	
    });

    $scope.incVote = function(id, index){
    	var vote = JSON.parse(window.localStorage.getItem(id));
    	window.localStorage.setItem(id,JSON.stringify({'upvote':parseInt(vote.upvote)+1,'downvote':vote.downvote}));
    	$scope.paths[index].upvote++;
    	$scope.total_upvotes++;
    	if($scope.sort=='Upvotes'){
    		$scope.result_count++;
    	}
    }

    $scope.decVote = function(id, index){
    	var vote = JSON.parse(window.localStorage.getItem(id));
    	window.localStorage.setItem(id,JSON.stringify({'upvote':vote.upvote,'downvote':parseInt(vote.downvote)+1}));
    	$scope.paths[index].downvote++;
    	if($scope.sort=='Downvotes'){
    		$scope.result_count++;
    	}
    }

    $scope.order = function(order){
    	if(order==0){
    		$scope.paths = $filter('orderBy')($scope.paths, '-upvote');
    		$scope.result_count = $scope.total_upvotes;
    	}
    	else if(order==1){
    		$scope.paths = $filter('orderBy')($scope.paths, '-downvote');
    		$scope.result_count = $scope.total_downvotes;
    	}
    	else if(order==2){
    		 $scope.paths = $filter('orderBy')($scope.paths, '-learner');
    		 $scope.result_count = $scope.total_learners;
    	}
    	else{
    		$scope.paths = $filter('orderBy')($scope.paths, '-hours');
    		$scope.result_count = $scope.total_hours;
    	}

    }
  });
