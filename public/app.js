var app = angular.module("votingApp", ["ngRoute", "votingApp.Auth", "ngFileUpload"]);

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
//    $locationProvider.hashPrefix("");
    
    $routeProvider
        .when("/", {
            templateUrl:"/components/welcome/welcome.html",
            controller: "welcomeCtrl"
        })
        .when("/issues", {
            templateUrl: "/components/issues/issues.html",
            controller: "issuesCtrl"
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "profileCtrl"
        })
        .when("/forgot", {
            templateUrl: "components/auth/forgot/forgot.html",
            controller: "forgotPasswordCtrt"
        })

        .otherwise({
            redirectTo: "/"
        })
}]);