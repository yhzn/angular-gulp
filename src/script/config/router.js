var App=angular.module('app');
App.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider.state('main',{
        url:'/main',
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    }).state('position',{
        url:'/position/:id',
        templateUrl:'view/position.html',
        controller:'positionCtrl'
    });
    $urlRouterProvider.otherwise('main')  // 上面路由没有匹配上 就跳转至 main
}])