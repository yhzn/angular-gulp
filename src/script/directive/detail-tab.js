angular.module('app').directive('detailTab',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'./view/template/detail-tab.html'
	}
}])