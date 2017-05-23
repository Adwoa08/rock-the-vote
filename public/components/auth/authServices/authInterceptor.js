var app = angular.module("votingApp.Auth");

app.service("authInterceptor", ["$q", "$location", "tokenService", function ($q, $location, tokenService) {  
    this.request = function(config) {
        var token = tokenService.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };

    this.responseError = function(response) {
        if (response.status === 401) {
            tokenService.removeToken();
            $location.path("/login");
        }
        return $q.reject(response);
    };
}]);