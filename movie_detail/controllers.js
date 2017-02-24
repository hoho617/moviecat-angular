/*详情页模块*/
(function(angular) {
    'use strict'
    angular.module('moviecat.movie_detail', ['ngRoute', 'moviecat.service.http']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/subject/:id', {
            templateUrl: 'movie_detail/view.html',
            controller: 'MovieDetailController'
        })
    }]).
    controller('MovieDetailController', [
        '$scope',
        '$routeParams',
        '$route',
        'HttpService',
        'AppConfig',
        function($scope, $routeParams, $route, HttpService, AppConfig) {
            $scope.loading = true; // 是否显示
            $scope.movie = {};
            var id = $routeParams.id;
            var movieDetailApi = AppConfig.detailApiAddress + id;
            HttpService.jsonp(movieDetailApi, {}, function(data) {
                console.log(data);
                $scope.movie = data;
                $scope.loading = false;
                $scope.$apply();
            });
        }
    ]);

})(angular);
