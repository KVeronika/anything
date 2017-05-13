'use strict';
(function (APP) {
    APP.namespace('GameObject');

    APP.GameObject = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = APP.constants.MAIN_SPRITE;
    };

    APP.GameObject.prototype.drawPicture = function (object, positionOnSrpite) {
        APP.canvasCtx.beginPath();
        APP.canvasCtx.drawImage(object.sprite, positionOnSrpite.x, positionOnSrpite.y, positionOnSrpite.width, positionOnSrpite.height, object.x, object.y, object.width, object.height);
        APP.canvasCtx.closePath();
    };
})(APP);