// components/navbar/navbar.js

var app = angular.module("votingApp");

app.directive("navbar", ["userService", function(UserService) {  
    return {
        templateUrl: "components/navbar/navbar.html",
        link: function(scope) {
            scope.userService = UserService;
        }
    }
}]);