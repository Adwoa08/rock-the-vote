var app = angular.module("votingApp");
app.service("httpService",["$http", function($http){
    
    var self = this;
    
    this.getOldPost = function(){
        
        return $http.get("/api/votes/").then(function(response){
            return self.OldPost = response.data;
        })  
    }
    
    
    
   this.posting = function(issue){
       return $http.post("/api/votes/", issue).then(function(response){
           return response.data;
       }) 
   } 
    
   
   
   this.editIssues = function(issue){
       return $http.put("/api/votes/" + issue._id, issue).then(function(response){
           return response.data;
       })
       
   }
   
      this.editComment = function(issue){
          
       return $http.put("/api/votes/" + issue._id, issue).then(function(response){
           return response.data;
       })
       
   }
    
  
      
      this.deleteOldIssue = function(id){
          return $http.delete("/api/votes/" + id).then(function(response){
             alert("Your item has been successfully deleted");
          })
      }
      
      
      
//User Request
      this.getCurrentUser = function(){
          return $http.get("/api/user/profile");
      }
      
      
      
}])