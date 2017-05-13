'use strict';
(function (APP) {
    APP.namespace('game');

    APP.game = function () {
        return {
            scores: 0,
            isOver: false,
            isPaused: false,
            isStarted: false,
        };
    };
})(APP);