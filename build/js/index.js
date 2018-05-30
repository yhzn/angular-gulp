angular.module('app',['ui.router','ngCookies']);
var App=angular.module('app');
App.controller('mainCtrl',['$http','$scope',function($http,$scope){
    $scope.click=function(){
    	alert(123)
    }

}]);
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
'user strict';
// 将post请求改为get请求
angular.module('app').config(['$provide',function($provide){
    $provide.decorator('$http',['$delegate','$q',function($delegate,$q){
        var get=$delegate.get;
        $delegate.post=function(url,data,config){
            var def=$q.defer();
            $delegate.get(url).then(function(res){
                def.resolve(res.data)
            },function(err){
                def.reject(err.data)
            });
            return {
                success:function(cd){
                    def.promise.then(cd);
                },
                error:function(cd){
                    def.promise.then(null,cd);
                }
            }
        }
        return $delegate;
    }])
}]);

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
angular.module('app').directive('detailMsg',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'./view/template/detail-msg.html',
		scope:{
			data:'='
		},
		link:function($scope){
           $scope.click=function(data){
             $scope.data=data;
           }
		}
	}
}])
angular.module('app').directive('detailTab',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'./view/template/detail-tab.html'
	}
}])
angular.module('app').directive('indexFoot',[function(){
 return {
 	restrict:'A',
 	replace:true,
 	templateUrl:'./view/template/index-foot.html'
 }
}]);	

angular.module('app').directive('indexHead',[function(){
 return {
 	restrict:'A',
 	replace:true,
 	templateUrl:'./view/template/index-head.html'
 }
}]);	

angular.module('app').filter('filterByObj',[function(){
    return function(list,obj){
        var result=[];
        angular.forEach(list,function(item){
            var isEqual=true;
            for(var e in obj){
                if(item[e]!==obj[e]){
                    isEqual=false;
                }
            }
            if(isEqual){
                result.push(item);
            }
        });
        return result;
    }
}]);

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














