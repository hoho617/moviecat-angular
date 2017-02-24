(function(angular) {
    'use strict'
    var http = angular.module('moviecat.service.http', []);
    http.service('HttpService', ['$window', '$document', function($window, $document) {
        // 业务逻辑都放在服务中
        // 具体的url为 http://api.douban.com/v2/movie/in_theaters?count=5&start=2&callback=my_cb018739
        this.jsonp = function(url, data, callback) {
            // 1.自定义一个回调函数名，将其挂载在window对象上，且将callback赋予它
            var myCbFunName = 'my_cb_' + Math.random().toString().replace('.', '');
            $window[myCbFunName] = callback;
            // 2.处理data
            var queryString = url.indexOf('?') == -1 ? '?' : '&';
            for (var key in data) {
                queryString += key + '=' + data[key] + '&';
            }
            // 此时queryString = ?count=5&start=2
            // 3.自定义一个回调函数(callback = myCbFunName)，并将其添加到queryString后面
            queryString += 'callback=' + myCbFunName;
            // 4.创建一个script标签，并添加到页面中
            var scriptElement = $document[0].createElement('script');
            scriptElement.src = url + queryString;
            $document[0].body.appendChild(scriptElement);
        };

    }]);
})(angular);
