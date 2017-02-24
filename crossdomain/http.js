(function(window, document) {
    'use strict'
    // 模仿angular的$http.jsonp方法，
    // 因为angular 随机分配的回调函数名称，此名称不被豆瓣支持
    var jsonp = function(url, data, callback) {
        // 1、自定义一个回调函数名，且将其挂载在window对象上，将callback赋给它
        var myCbFunName = 'my_jsonp_cb' + Math.random().toString().replace('.', '');
        window[myCbFunName] = callback; // window.myCbFunName0128938 = callback;
        // 2、处理data，将对象形式转换为字符串形式
        var queryString = url.indexOf('?') == -1 ? '?' : '&';
        for (var key in data) {
            queryString += key + '=' + data[key] + '&';
        };
        // 3、自定义回调参数callback=myCbFunName，并将其添加到queryString后面
        queryString += 'callback=' + myCbFunName;
        // 4、创建script标签，并添加到页面上
        var scriptElement = document.createElement('script');
        scriptElement.src = url + queryString;
        document.body.appendChild(scriptElement);
    };
    window.jsonp = jsonp;
})(window, document);
