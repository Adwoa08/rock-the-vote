var app = angular.module("votingApp");

app.controller("profileCtrl", ["$scope", "userService", "httpService", "Upload", function ($scope, userService, httpService, Upload) {
//    $scope.userService = userService;
    
    $scope.changePassword = function (passwords) {
        if (passwords.newPassword === passwords.newPasswordRepeat) {
            userService.changePassword(passwords.newPassword).then(function (response) {
                $scope.passwords = {};
            })
        } else {
            alert("The two passwords didn't match");
        }
    }
    
    
    httpService.getCurrentUser().then(function (response) {
        $scope.user = response.data;
    });

    $scope.uploadPic = function (file) {
        upload(file);
    };

    function upload(file) {
        Upload.upload({
            url: "/api/user",
            method: "PUT",
            data: {
                file: file
            }
        }).then(function (response) {
            $scope.user = response.data;
            $scope.file = null;
        });
    }


}]);
