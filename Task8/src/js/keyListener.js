'use strict';
(function (APP) {
    APP.helpers.keyListener = (function () {
        var pressedKeys = {};

        function setKey(event, status) {
            var code = event.keyCode,
                key;

            switch (code) {
                case 37:
                    key = 'LEFT'; break;
                case 39:
                    key = 'RIGHT'; break;
                default:
                    // Convert ASCII codes to letters
                    key = String.fromCharCode(code);
            }

            pressedKeys[key] = status;
        }

        document.addEventListener('keydown', function (e) {
            setKey(e, true);
        });

        document.addEventListener('keyup', function (e) {
            setKey(e, false);
        });

        return {
            isDown: function (key) {
                return pressedKeys[key.toUpperCase()];
            }
        };
    })();
})(APP);