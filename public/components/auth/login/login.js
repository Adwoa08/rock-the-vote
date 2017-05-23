var app = angular.module("votingApp.Auth");

app.controller("loginCtrl", ["$scope", "$location", "userService", function ($scope, $location, userService) {

    $scope.login = function (user) {
        userService.login(user).then(function (response) {
            $location.path("/issues");
        }, function (response) {
            alert(response.data.message);
        });
    }
}]);