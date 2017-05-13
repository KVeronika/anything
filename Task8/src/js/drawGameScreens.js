'use strict';
(function () {
    var pauseScreenText = 'Your game is paused, press on a "Pause" button to resume',
        startScreenText = 'To start new game, press on a "Start" button',
        finishScreenText,
        textFillSettings = {
            lineHeight: 25,
            marginLeft: 20,
            marginTop: APP.canvas.height / 2 - 40,
            maxWidth: APP.canvas.width - 20,
        },
        pauseBlock = {
            x: 10,
            y: textFillSettings.marginTop - 35,
            width: APP.canvas.width - textFillSettings.marginLeft / 2,
            height: 80,
        };

    function wrapText(text, marginTop) {
        var words = text.split(' '),
            countWords = words.length,
            line = '',
            n,
            testLine,
            testWidth;

        for (n = 0; n < countWords; n++) {
            testLine = line + words[n] + ' ';
            testWidth = APP.canvasCtx.measureText(testLine).width;
            if (testWidth > textFillSettings.maxWidth) {
                APP.canvasCtx.fillText(line, textFillSettings.marginLeft, marginTop);
                line = words[n] + ' ';
                marginTop += textFillSettings.lineHeight;
            }
            else {
                line = testLine;
            }
        }
        APP.canvasCtx.fillText(line, textFillSettings.marginLeft, marginTop);
    };

    function tuneCanvasToPrintStartScreen() {
        APP.canvasCtx.clearRect(0, 0, APP.canvas.width, APP.canvas.height);
        APP.canvasCtx.font = '22pt Calibri';
        APP.canvasCtx.fillStyle = '#000';
    };

    function tuneCanvasToPrintPauseScreen() {
        APP.canvasCtx.fillStyle = '#fff';
        APP.canvasCtx.fillRect(pauseBlock.x, pauseBlock.y, pauseBlock.width, pauseBlock.height);
        APP.canvasCtx.fillStyle = '#000';
    };

    APP.helpers.drawPauseScreen = function () {
        var text = pauseScreenText;

        tuneCanvasToPrintPauseScreen();
        wrapText(text, textFillSettings.marginTop);
    };

    APP.helpers.drawStartScreen = function () {
        var text = startScreenText;

        tuneCanvasToPrintStartScreen();
        wrapText(text, textFillSettings.marginTop);
    };

    APP.helpers.drawFinishScreen = function (scores) {
        finishScreenText = 'Game over! Your scores: ' + scores + '. To start new game, press on a "Start" button';
        // finishScreenText = `Game over! Your scores: ${scores}. To start new game, press on a "Start" button`;

        APP.canvasCtx.clearRect(0, 0, APP.canvas.width, APP.canvas.height);
        wrapText(finishScreenText, textFillSettings.marginTop);
    };

    APP.helpers.drawDividingLines = function () {
        APP.canvasCtx.strokeStyle = '#ff87a1';
        APP.canvasCtx.beginPath();
        APP.canvasCtx.moveTo(APP.canvas.width / 3, 0);
        APP.canvasCtx.lineTo(APP.canvas.width / 3, APP.canvas.height);
        APP.canvasCtx.moveTo(APP.canvas.width / 3 * 2, 0);
        APP.canvasCtx.lineTo(APP.canvas.width / 3 * 2, APP.canvas.height);
        APP.canvasCtx.closePath();
        APP.canvasCtx.stroke();
    };
    APP.helpers.printScores = function (scores) {
        APP.scoresSpan.innerText = scores;
    };

    APP.helpers.printLives = function (lives) {
        APP.livesSpan.innerText = lives;
    };
})();