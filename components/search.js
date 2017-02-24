(function(angular) {
    'use strict'
    angular.module('moviecat.directive.search', [])
        .directive('search', ['$route', function($route) {
            return {
                restrict: 'AE',
                template: '<form ng-submit="search()"><input type = "text" placeholder = "搜索从这里开始..." ng-model = "input"><button type = "submit"></button></form>',
                // replace: true,
                link: function($scope, iElement, iAttrs) {
                    $scope.input = '';
                    $scope.search = function() {
                        $route.updateParams({
                            category: 'search',
                            q: $scope.input
                        });
                    };
                }
            };
        }])
})(angular);
