// 创建全局对象
// 定义一个dict全局变量，并同时对其初始化
// 通过依赖注入方式使用
// run()整个模块初始化操作 dict需要引入
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
 $http.get('data/city.json').then(function(res){
     dict.city=res.data;
 });
 $http.get('data/salary.json').then(function(res){
     dict.salary=res.data;
 });
 $http.get('data/scale.json').then(function(res){
     dict.scale=res.data;
 });
}]);