'use strict';
(function (APP) {
    var resourceCache = {},
        readyCallbacks = [];

    APP.namespace('resourses');

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function (url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        var img;

        if (resourceCache[url]) {
            return resourceCache[url];
        }
        img = new Image();
        img.onload = function () {
            resourceCache[url] = img;

            if (isReady()) {
                readyCallbacks.forEach(function (func) { func(); });
            }
        };
        resourceCache[url] = false;
        img.src = url;
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true,
            k;

        for (k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) &&
                !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    APP.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})(APP);