var App=angular.module('app');
App.controller('mainCtrl',['$http','$scope',function($http,$scope){
    $scope.click=function(){
    	alert(123)
    }

}]);