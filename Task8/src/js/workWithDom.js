'use strict';
(function (APP) {
    (function createNamespacesForDomElements() {
        APP.namespace('canvas');
        APP.namespace('canvasCtx');
        APP.namespace('startBtn');
        APP.namespace('pauseBtn');
        APP.namespace('stopBtn');
        APP.namespace('scoresSpan');
        APP.namespace('livesSpan');
    })();

    (function getDomElements() {
        APP.canvas = document.getElementById('mainCanvas');
        APP.canvasCtx = APP.canvas.getContext('2d');
        APP.startBtn = document.getElementById('startBtn');
        APP.pauseBtn = document.getElementById('pauseBtn');
        APP.stopBtn = document.getElementById('stopBtn');
        APP.scoresSpan = document.getElementById('scoresSpan');
        APP.livesSpan = document.getElementById('livesSpan');
    })();
})(APP);