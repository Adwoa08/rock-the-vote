var app = angular.module("votingApp");

app.controller("issuesCtrl", ["$scope", "httpService", function ($scope, httpService) {

    $scope.issues = [];

    //--------------get function------------------------  
    httpService.getOldPost().then(function (oldPost) {
        $scope.issues = oldPost;
    })


    //--------------post function------------------------  
    $scope.postIssue = function (issue) {

        httpService.posting(issue).then(function (data) {
            $scope.issues.push(data);
        })

        $scope.issue = {};
    }


    //--------------put function------------------------  


    $scope.upVote = function (issue) {
            issue.likes++;
            httpService.editIssues(issue).then(function (data) {
                $scope.likes = data;
            })
    }


    $scope.downVote = function (issue) {
        issue.dislikes++;
        httpService.editIssues(issue).then(function (data) {
            $scope.dislikes = data;
        })
    }



    $scope.addComment = function (comment, item) {
        item.comments.push(comment);
        httpService.editComment(item).then(function (data) {
           issue = data;
        })
        console.log($scope.newComment);
        $('#text').val('');
    }


    //--------------delete function------------------------ 
    $scope.deleteIssue = function (index, id) {

        httpService.deleteOldIssue(id).then(function (response) {
            $scope.issues.splice(index, 1);
        })

    }
   
}])


