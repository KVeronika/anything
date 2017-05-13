'use strict';
(function (APP) {
    APP.namespace('car');

    APP.car = function () {
        var car;

        function Car(x, y, width, height) {
            APP.GameObject.call(this, x, y, width, height);
            this.dx = 10;
            this.lives = 3;
            this.speed = 3;
            this.dSpeed = 0.0001;
            this.type = APP.constants.SIMPLE_CAR_TYPE;
            this.decoratorsList = [];
        }
        APP.helpers.inherit(Car, APP.GameObject);

        Car.decorators = {};

        Car.decorators.SUV = {
            getType: function () {
                return APP.constants.DECORATED_CAR_TYPE;
            }
        };

        Car.prototype.decorate = function (decorator) {
            this.decoratorsList.push(decorator);
        };

        Car.prototype.undecorate = function (decorator) {
            var index = this.decoratorsList.indexOf(decorator);

            if (index > -1) {
                this.decoratorsList.splice(index, 1);
            }
        };

        Car.prototype.getType = function () {
            var type = this.type,
                i,
                max = this.decoratorsList.length,
                name;

            for (i = 0; i < max; i += 1) {
                name = this.decoratorsList[i];
                type = Car.decorators[name].getType();
            }
            return type;
        };

        (function initCar() {
            var carX,
                carY,
                carWidth = 100,
                carHeight = 150;

            carX = APP.canvas.width / 2 - carWidth / 2;
            carY = APP.canvas.height - carHeight;
            car = new Car(carX, carY, carWidth, carHeight);
        })();

        function drawCarFromSprite() {
            var positionOnSprite = {
                x: 0,
                y: 0,
                width: APP.constants.MAIN_SPRITE.width / APP.constants.MAIN_SPRITE.countOfObjects,
                height: APP.constants.MAIN_SPRITE.carHeight,
            };

            car.drawPicture(car, positionOnSprite);
        }

        function drawTankFromSprite() {
            var positionOnSprite = {
                x: APP.constants.MAIN_SPRITE.width / APP.constants.MAIN_SPRITE.countOfObjects * 3,
                y: 0,
                width: APP.constants.MAIN_SPRITE.width / APP.constants.MAIN_SPRITE.countOfObjects,
                height: APP.constants.MAIN_SPRITE.tankHeight,
            };

            car.drawPicture(car, positionOnSprite);
        }

        function moveCarToLeft() {
            if (car.x - car.dx > 0) {
                car.x -= car.dx;
            }
        }

        function moveCarToRight() {
            if (car.x + car.dx <= APP.canvas.width - car.width) {
                car.x += car.dx;
            }
        }

        function increaseCarSpeed() {
            car.speed += car.dSpeed;
        }

        car.update = function () {
            if (APP.helpers.keyListener.isDown('LEFT')) {
                moveCarToLeft();
            }
            if (APP.helpers.keyListener.isDown('RIGHT')) {
                moveCarToRight();
            }
            increaseCarSpeed();
        };

        car.draw = function () {
            if (car.getType() === APP.constants.DECORATED_CAR_TYPE) {
                drawTankFromSprite();
            }
            else {
                drawCarFromSprite();
            }
        };

        return car;
    };
})(APP);