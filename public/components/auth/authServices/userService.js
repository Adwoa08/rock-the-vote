var app = angular.module("votingApp.Auth");

app.service("userService", ["$http", "$location", "tokenService", function ($http, $location, tokenService) {
    
    
    
    
    var self = this;
//    this.currentUser = $localStorage.user || {};

    this.signup = function (user) {
        return $http.post("/auth/signup", user);
    };

    this.login = function (user) {
        return $http.post("/auth/login", user).then(function (response) {
            self.currentUser = response.data.user;
//            $localStorage.user = response.data.user;
            tokenService.setToken(response.data.token);
            return response;
        });
    };
    
    this.logout = function () {
        tokenService.removeToken();
//        delete $localStorage.user;
        alert("You have successfully logged out!");
        $location.path("/");
    };

    
    
//Authenticate function
    this.isAuthenticated = function () {
        return !!tokenService.getToken();
    };

    
//Change password for loggedIn users
    this.changePassword = function (newPassword) {
        console.log(newPassword);
        return $http.post("/auth/change-password", {
            newPassword: newPassword
        }).then(function (response) {
            alert("Password Changed Successfully!");
            return response.data;
        }, function (response) {
            alert("Problem with the server");
        });
    };
    
//Reset password for users who cannot login
    this.forgotPassword = function (email) {  
    console.log("Sending an email to " + email);
    return $http.post("/auth/forgot", {email: email})
};
    
    
//reset password referrence it calls out to /auth/reset/<someResetToken>
this.resetForgottenPassword = function(password, resetToken) {  
    return $http.post("/auth/reset/" + resetToken, {password: password}).then(function (response) {
        return response.data.message;
    });
};
    
}]);
