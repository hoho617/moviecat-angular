(function(angular) {
    'use strict'
    angular.module('moviecat.directive.auto_focus', []).
    directive('autoFocus', ['$location', function($location) {
        // 监听url中的路由参数，如果他和点击元素的href的值一样，则给其添加active类
        return {
            restrict: 'A',
            link: function($scope, iElement, iAttrs) {
                $scope.$location = $location;
                $scope.$watch('$location.path()', function(now) {
                    var aHref = iElement.children().attr('href'); // 首先取到所有a元素的href属性
                    var category = aHref.replace(/#(\/.+?)\/\d+/, '$1'); // 再用正则匹配出/in_theraters
                    if (now.startsWith(category)) { // 比较当前url中的路由参数是否以 正则匹配出来的开头
                        iElement.parent().children().removeClass('active');
                        iElement.addClass('active');
                    } else {
                        iElement.removeClass('active');
                    }
                });
                /*iElement.on('click', function() {
                    iElement.parent().children().removeClass('active');
                    iElement.addClass('active');
                });*/
            }
        };
    }])
})(angular);
