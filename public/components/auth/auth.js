var app = angular.module("votingApp.Auth", []);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/signup", {
            templateUrl: "components/auth/signup/signup.html",
            controller: "signupCtrl"
        })
        .when("/login", {
            templateUrl: "components/auth/login/login.html",
            controller: "loginCtrl"
        })
        .when("/logout", {
            controller: "logoutCtrl",
            template: ""
        })
//        .when("/reset/:resetToken", {
//            templateUrl: "components/auth/reset/reset.html",
//            controller: "passwordResetCtrl"
//        })
//        .when("/forgot", {
//            templateUrl: "auth/forgot/forgot.html",
//            controller: "forgotPasswordCtrl"
//        })
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
}]);
