var app = angular.module("votingApp.Auth");

app.controller("passwordResetController", ["$scope", "$location", "$routeParams", "userService", function ($scope, $location, $routeParams, userService) {  
    $scope.resetForgottenPassword = function(password, passwordRepeat) {
        if (password === passwordRepeat) {
            userService.resetForgottenPassword(password, $routeParams.resetToken).then(function(message) {
                alert(message);
                $location.path("/login");
            });
        }
    };
}]);