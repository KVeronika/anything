'use strict';
(function (APP) {
    var car,
        map,
        game = APP.game(),
        undecorateScores = 0;

    function initNewGame() {
        car = APP.car();
        map = APP.map();
        game = APP.game();
        game.isStarted = true;
        undecorateScores = 0;
    }

    function isCollisionWithBlock(car, block) {
        return block.x + block.width > car.x && block.x < car.x + car.width
            && block.y + block.height > car.y && block.y < car.y + car.height;
    }

    function checkToGameOver() {
        if (car.lives === 0) {
            game.isOver = true;
        }
    }

    function checkScoresToChangeCarState() {
        if (game.scores % undecorateScores === 0) {
            car.undecorate(APP.constants.DECORATED_CAR_TYPE);
        }
        if (game.scores % APP.constants.CHANGE_CAR_TYPE_SCORES_DIVIDER === 0 && game.scores > undecorateScores) {
            undecorateScores = game.scores + APP.constants.CHANGE_CAR_TYPE_SCORES_STEP;
            car.decorate(APP.constants.DECORATED_CAR_TYPE);
        }
    }

    function collisionWithBarrier(i, j) {
        if (car.getType() === APP.constants.SIMPLE_CAR_TYPE) {
            car.lives--;
            map[i][j].isBump = true;
            checkToGameOver();
        }
    }

    function collisionWithBonus(i, j) {
        map[i][j].isCounted = true;
        game.scores += map[i][j].usefulness;
        checkScoresToChangeCarState();
    }

    function isCollisions(car, map) {
        var i,
            j;

        for (i = 0; i < APP.constants.MAP_DIMENSION; i++) {
            for (j = 0; j < APP.constants.COUNT_OF_PIECES_IN_MAP_STRING; j++) {
                if (isCollisionWithBlock(car, map[i][j])) {
                    if (map[i][j].type === APP.constants.BARRIER_NAME && !map[i][j].isBump) {
                        collisionWithBarrier(i, j);
                        return;
                    }
                    if (map[i][j].type === APP.constants.BONUS_NAME && !map[i][j].isCounted) {
                        collisionWithBonus(i, j);
                        return;
                    }
                }
            }
        }
    }

    function draw() {
        APP.canvasCtx.clearRect(0, 0, APP.canvas.width, APP.canvas.height);
        APP.helpers.drawDividingLines();
        map.draw();
        car.draw();
    }

    function update() {
        car.update();
        map.update(car.speed);
    }

    function gameLoop() {
        if (game.isOver) {
            APP.helpers.drawFinishScreen(game.scores);
            return;
        }
        if (!game.isPaused) {
            update();
            isCollisions(car, map);
            draw();
            APP.helpers.printScores(game.scores);
            APP.helpers.printLives(car.lives);
        }
        if (game.isPaused && !game.isOver) {
            APP.helpers.drawPauseScreen();
        }
    }

    function play() {
        if (game.isStarted) {
            gameLoop();
        }
        else {
            APP.helpers.drawStartScreen();
        }
        requestAnimationFrame(play);
    }
    if(APP.resources.isReady) {
        requestAnimationFrame(play);
    }

    APP.startBtn.addEventListener('click', function () {
        initNewGame();
        gameLoop();
    });

    APP.pauseBtn.addEventListener('click', function () {
        game.isPaused = !game.isPaused;
    });

    APP.stopBtn.addEventListener('click', function () {
        game.isOver = true;
        APP.helpers.drawFinishScreen();
    });
})(APP);