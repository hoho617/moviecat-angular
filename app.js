/*主模块*/
(function(angular) {
    'use strict'
    var module = angular.module('moviecat', [
        'ngRoute',
        'moviecat.movie_detail',
        'moviecat.movie_list',
        'moviecat.directive.auto_focus',
        'moviecat.directive.search'
    ]);
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/in_theaters/1'
        });
    }]);
    module.constant('AppConfig', {
        count: 10,
        listApiAddress: 'http://api.douban.com/v2/movie/',
        detailApiAddress: 'http://api.douban.com/v2/movie/subject/'
    });
    // 搜索模块的控制器
    /*module.controller('SearchController', ['$scope', '$route', function($scope, $route) {
            $scope.input = ''; // 搜索文本框的内容
            $scope.search = function() { // 将文本框中输入的内容，更新到url中的q后面
                $route.updateParams({
                    category: 'search',
                    q: $scope.input
                });
            }
        }])*/
    // 公共模块的控制器
    /*module.controller('NavController', ['$scope', '$location', function($scope, $location) {
        $scope.$loation = $location;
        $scope.$watch('$loation.path()', function(now) {
            if (now.startsWith('/in_theaters')) {
                $scope.category = 'in_theaters';
            } else if (now.startsWith('/coming_soon')) {
                $scope.category = 'coming_soon';
            } else if (now.startsWith('/top250')) {
                $scope.category = 'top250';
            }
        });
    }])*/
})(angular);
