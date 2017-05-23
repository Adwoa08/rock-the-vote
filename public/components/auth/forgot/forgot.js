var app = angular.module("votingApp.Auth");

app.controller("forgotPasswordCtrl", ["$scope", "userService", function ($scope, userService) {
    $scope.forgotPassword = function(email) {
        userService.forgotPassword(email).then(function(response) {
            alert(response.data.message);
        }, function (response) {
            alert(response.data.message);
        });
    };
}]);