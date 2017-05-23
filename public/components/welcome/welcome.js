var app = angular.module("votingApp");
app.controller("welcomeCtrl", ["$scope", function($scope){
    $scope.test = "This page will display all the comments from users"
}]);