'use strict';
(function (APP) {
    APP.namespace('helpers.inherit');

    APP.helpers.inherit = (function () {
        var F = function () { };

        return function (C, P) {
            F.prototype = P.prototype;
            C.prototype = new F();
            C.uber = P.prototype;
            C.prototype.constructor = C;
        };
    }());
})(APP);