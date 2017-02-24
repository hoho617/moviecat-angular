/*子模块*/
(function(angular) {
    'use strict'
    angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.service.http']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:category/:page', {
            templateUrl: 'movie_list/view.html',
            controller: 'MovieListController'
        })
    }]).
    controller('MovieListController', ['$scope', '$routeParams', '$route', 'HttpService', 'AppConfig', function($scope, $routeParams, $route, HttpService, AppConfig) {
        $scope.loading = true; // 是否显示
        $scope.totalCount = 0; //总共多少条
        $scope.title = 'Loading...';
        var page = parseInt($routeParams.page); // 当前的页数
        var count = AppConfig.count; // 一页显示的数量
        var start = (page - 1) * count; // 从第几条开始
        $scope.totalPages = 0;
        $scope.currentPage = page;
        // 数据为一个数组
        $scope.subjects = [];
        // $routeParams中的数据来源 1.路由匹配出来 2.?后面的参数即:api.douban.com/v2/movie/in_theaters/1?q=
        HttpService.jsonp(AppConfig.listApiAddress + $routeParams.category, {
            start: start,
            count: count,
            q: $routeParams.q
        }, function(data) {
            $scope.title = data.title;
            $scope.subjects = data.subjects;
            $scope.loading = false;
            $scope.totalCount = data.total;
            $scope.totalPages = Math.ceil($scope.totalCount / count);
            // $apply的作用是同步表达式
            $scope.$apply();
        });
        // 点击上一页 和下一页,原理在于更新page
        $scope.goPage = function(page) {
            if (page >= 1 && page <= $scope.totalPages) {
                $route.updateParams({
                    page: page
                });
            }
        };
    }])

})(angular);
