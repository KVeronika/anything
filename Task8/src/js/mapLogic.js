'use strict';
(function (APP) {
    APP.namespace('map');

    APP.map = function () {
        var map = [];

        function PieceOfMap(x, y) {
            APP.GameObject.call(this, x, y, APP.constants.PIECE_OF_MAP_WIDTH, APP.constants.PIECE_OF_MAP_HEIGHT);
        }

        APP.helpers.inherit(PieceOfMap, APP.GameObject);

        PieceOfMap.factory = function (i, j, type) {
            var constr = type,
                pieceX = j * APP.constants.PIECE_OF_MAP_WIDTH,
                pieceY = 0 - i * APP.constants.PIECE_OF_MAP_HEIGHT;

            if (typeof PieceOfMap[constr] !== 'function') {
                throw new {
                    name: 'Error',
                    message: constr + ' doesn’t exist'
                };
            }
            map[i][j] = new PieceOfMap[constr](pieceX, pieceY);
        };

        PieceOfMap.Barrier = function (pieceX, pieceY) {
            PieceOfMap.call(this, pieceX, pieceY);
            this.damage = 1;
            this.isBump = false;
            this.type = APP.constants.BARRIER_NAME;
        };

        PieceOfMap.Bonus = function (pieceX, pieceY) {
            PieceOfMap.call(this, pieceX, pieceY);
            this.usefulness = 10;
            this.isCounted = false;
            this.type = APP.constants.BONUS_NAME;
        };

        PieceOfMap.Empty = function (pieceX, pieceY) {
            PieceOfMap.call(this, pieceX, pieceY);
            this.type = APP.constants.EMPTY_BLOCK_NAME;
        };

        APP.helpers.inherit(PieceOfMap.Barrier, PieceOfMap);
        APP.helpers.inherit(PieceOfMap.Bonus, PieceOfMap);
        APP.helpers.inherit(PieceOfMap.Empty, PieceOfMap);

        function createElementsInMap() {
            var i,
                j;

            for (i = 0; i < APP.constants.MAP_DIMENSION; i++) {
                map[i] = [];
                for (j = 0; j < APP.constants.COUNT_OF_PIECES_IN_MAP_STRING; j++) {
                    PieceOfMap.factory(i, j, APP.constants.EMPTY_BLOCK_NAME);
                }
            }
        }

        function randomInteger(min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);

            rand = Math.round(rand);
            return rand;
        }

        function drawBarrierFromSprite(piece) {
            var positionOnSprite = {
                x: APP.constants.MAIN_SPRITE.width / APP.constants.MAIN_SPRITE.countOfObjects * 2,
                y: 0,
                width: APP.constants.MAIN_SPRITE.width / APP.constants.MAIN_SPRITE.countOfObjects,
                height: APP.constants.MAIN_SPRITE.barrierHeight,
            };

            piece.drawPicture(piece, positionOnSprite);
        }

        function drawBonusFromSprite(piece) {
            var positionOnSprite = {
                x: APP.constants.MAIN_SPRITE.width / APP.constants.MAIN_SPRITE.countOfObjects,
                y: 0,
                width: APP.constants.MAIN_SPRITE.width / APP.constants.MAIN_SPRITE.countOfObjects,
                height: APP.constants.MAIN_SPRITE.bonusHeight,
            };

            piece.drawPicture(piece, positionOnSprite);
        }

        function setIsCountedFlagToFalse(bonus) {
            bonus.isCounted = false;
        }

        function prepareLineToLooping(line) {
            var i;

            for (i = 0; i < APP.constants.COUNT_OF_PIECES_IN_MAP_STRING; i++) {
                line[0][i].y = map[APP.constants.MAP_DIMENSION - 2][0].y - line[0][i].height;
                if (line[0][i].type === APP.constants.BONUS_NAME) {
                    setIsCountedFlagToFalse(line[0][i]);
                }
            }
        }

        function pushLineToMap(line) {
            prepareLineToLooping(line);
            map.push(line[0]);
        }

        function mapLooping(i) {
            var removed = map.splice(i, 1);

            pushLineToMap(removed);
        }

        function createBarriers(i) {
            if (i < APP.constants.MAP_DIMENSION / 2) {
                PieceOfMap.factory(i, randomInteger(0, 2), APP.constants.BARRIER_NAME);
            }
            else {
                PieceOfMap.factory(i, randomInteger(0, 2), APP.constants.BARRIER_NAME);
                PieceOfMap.factory(i, randomInteger(0, 2), APP.constants.BARRIER_NAME);
            }
        }

        (function fillMap() {
            var createBonusRand,
                i,
                j;

            createElementsInMap();
            for (i = 0; i < APP.constants.MAP_DIMENSION; i++) {
                for (j = 0; j < APP.constants.COUNT_OF_PIECES_IN_MAP_STRING; j++) {
                    createBonusRand = randomInteger(0, 10);
                    if (i % 2 === 0) {
                        createBarriers(i);
                        break;
                    }
                    if (createBonusRand >= 9) {
                        PieceOfMap.factory(i, j, APP.constants.BONUS_NAME);
                    }
                }
            }
        })();


        map.draw = function () {
            var i,
                j;

            for (i = 0; i < APP.constants.MAP_DIMENSION; i++) {
                for (j = 0; j < APP.constants.COUNT_OF_PIECES_IN_MAP_STRING; j++) {
                    if (map[i][j].type === APP.constants.BARRIER_NAME) {
                        drawBarrierFromSprite(map[i][j]);
                    }
                    else if (map[i][j].type === APP.constants.BONUS_NAME && !map[i][j].isCounted) {
                        drawBonusFromSprite(map[i][j]);
                    }
                }
            }
        };

        map.update = function (speed) {
            var i,
                j;

            for (i = 0; i < APP.constants.MAP_DIMENSION; i++) {
                for (j = 0; j < APP.constants.COUNT_OF_PIECES_IN_MAP_STRING; j++) {
                    map[i][j].y += speed;
                    if (map[i][j].y > APP.canvas.height) {
                        mapLooping(i);
                        break;
                    }
                }
            }
        };

        return map;
    };
})(APP);