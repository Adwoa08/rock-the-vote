
var app = angular.module("votingApp.Auth");

app.controller("logoutCtrl", ["userService", function (userService) {  
    userService.logout();
}]);