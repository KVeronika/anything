'use strict';
(function (APP) {
    (function createNamespacesForConstants() {
        APP.namespace('constants.MAIN_SPRITE');
        APP.namespace('constants.MAP_DIMENSION');
        APP.namespace('constants.COUNT_OF_PIECES_IN_MAP_STRING');
        APP.namespace('constants.BARRIER_NAME');
        APP.namespace('constants.BONUS_NAME');
        APP.namespace('constants.EMPTY_BLOCK_NAME');
        APP.namespace('constants.PIECE_OF_MAP_WIDTH');
        APP.namespace('constants.PIECE_OF_MAP_HEIGHT');
    })();

    (function initConstants() {
        function initMainSprite() {
            APP.constants.MAIN_SPRITE = APP.resources.get('../src/img/sprites.png');
            APP.constants.MAIN_SPRITE.width = 800;
            APP.constants.MAIN_SPRITE.carHeight = 403;
            APP.constants.MAIN_SPRITE.barrierHeight = 200;
            APP.constants.MAIN_SPRITE.bonusHeight = 130;
            APP.constants.MAIN_SPRITE.tankHeight = 230;
            APP.constants.MAIN_SPRITE.countOfObjects = 4;
        }
        APP.resources.load('../src/img/sprites.png');
        APP.resources.onReady(initMainSprite);
        APP.constants.MAP_DIMENSION = 100;
        APP.constants.SIMPLE_CAR_TYPE = 'car';
        APP.constants.DECORATED_CAR_TYPE = 'SUV';
        APP.constants.COUNT_OF_PIECES_IN_MAP_STRING = 3;
        APP.constants.BARRIER_NAME = 'Barrier';
        APP.constants.BONUS_NAME = 'Bonus';
        APP.constants.EMPTY_BLOCK_NAME = 'Empty';
        APP.constants.PIECE_OF_MAP_WIDTH = 200;
        APP.constants.PIECE_OF_MAP_HEIGHT = 200;
        APP.constants.CHANGE_CAR_TYPE_SCORES_DIVIDER = 20;
        APP.constants.CHANGE_CAR_TYPE_SCORES_STEP = 30;
    })();
})(APP);