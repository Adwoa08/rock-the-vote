var app = angular.module("votingApp");
app.controller("welcomeCtrl", ["$scope", "httpService",  function($scope, httpService){

    httpService.getAllPost().then(function(data){
        $scope.allIssues = data;
    })
     
     
}]);