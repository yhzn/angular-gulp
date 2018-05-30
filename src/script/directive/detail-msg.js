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