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



















