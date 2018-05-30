
// service 与 factory 作用是一样的 使用方式基本类似 但factory优势在于可以声明私有属性 factory返回的是一个对象 service返回的是一个函数， 是绑定在this上进行拓展

// 自定义服务用法与$http服务用法相同   只要将service服务名cache作为依赖传入即可

'use strict';
// angular.module('app').service('cache',['$cookies',function($cookies){
// // 创建一个服务
//     this.put=function(key,value){
//         $cookies.put(key,value);
//
//     };
//     this.get=function(key){
//         return $cookies.get(key);
//
//     };
//     this.remove=function(key){
//         return $cookies.remove(key);
//
//     }
//
// }]);



angular.module('app').factory('cache',['$cookies',function($cookies){
// 创建一个服务
    var obj={}; // 可创建私有变量
    return {
      put:function(key,value){
          $cookies.put(key,value);
      },
      get:function(key){
          return $cookies.get(key);
      },
      remove:function(key){
          return $cookies.remove(key);
      }
    }


}]);














