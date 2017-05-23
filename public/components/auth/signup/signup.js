var app = angular.module("votingApp.Auth");

app.controller("signupCtrl", ["$scope", "$location", "userService", function ($scope, $location, userService) {  
    $scope.passwordMessage = "";

    $scope.signup = function (user) {
        if (user.password !== $scope.passwordRepeat) {
            $scope.passwordMessage = "Passwords do not match.";
        } else {
            userService.signup(user).then(function (response) {
                $location.path("/login");
            }, function (response) {
                alert("There was a problem: " + response.data);
            });
        }
    }
}]);