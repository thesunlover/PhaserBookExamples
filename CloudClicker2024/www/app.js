var app;
(function (app) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
            this.game.state.add('boot', new app.states.Boot());
            this.game.state.add('preload', new app.states.Preload());
            this.game.state.add('game', new app.states.Game());
            this.game.state.start('boot');
        }
        return App;
    }());
    app.App = App;
})(app || (app = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var states;
    (function (states) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                this.load.image('preloader', 'assets/images/loading_bar.png');
            };
            Boot.prototype.create = function () {
                console.log("boot state ready");
                this.game.state.start('preload');
            };
            return Boot;
        }(Phaser.State));
        states.Boot = Boot;
    })(states = app.states || (app.states = {}));
})(app || (app = {}));
var app;
(function (app) {
    var states;
    (function (states) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game() {
                return _super.call(this) || this;
            }
            Game.prototype.create = function () {
                console.log("game state ready");
                this.background = this.game.add.existing(new Phaser.Sprite(this.game, 0, 0, "game_bg"));
                this.clouds = this.add.group();
                this.score = 0;
                var style = { font: "24px Arial", fill: "#FFFFFF" };
                this.txtScore = this.add.text(10, 10, this.score.toString(), style);
            };
            Game.prototype.update = function () {
                if (Math.random() < .01) {
                    var cloud = this.clouds.getFirstDead();
                    if (cloud) {
                        cloud.x = Math.random() * this.game.width;
                        cloud.y = Math.random() * this.game.height;
                        cloud.revive();
                    }
                    else {
                        var cloud = this.clouds.create(Math.random() * this.game.width, Math.random() * this.game.height, "cloud");
                        cloud.inputEnabled = true;
                        cloud.events.onInputDown.add(this.onCloudClick, this);
                    }
                    cloud.alpha = 0;
                    this.add.tween(cloud).to({ y: "-50", alpha: 1 }, 800, Phaser.Easing.Cubic.Out, true);
                }
            };
            Game.prototype.onCloudClick = function (cloud) {
                cloud.kill();
                this.score++;
                this.txtScore.setText(this.score.toString());
            };
            return Game;
        }(Phaser.State));
        states.Game = Game;
    })(states = app.states || (app.states = {}));
})(app || (app = {}));
var app;
(function (app) {
    var states;
    (function (states) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                var _this = _super.call(this) || this;
                _this.preloadAsset = null;
                _this.ready = false;
                return _this;
            }
            Preload.prototype.preload = function () {
                this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
            };
            Preload.prototype.create = function () {
                console.log("preload state ready");
                this.add.sprite(0, 0, "loading_bg");
                this.preloadAsset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
                this.preloadAsset.anchor.setTo(0.5, 0.5);
                this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
                this.load.setPreloadSprite(this.preloadAsset);
                this.load.image('cloud', 'assets/images/cloud.png');
                this.load.image('game_bg', 'assets/images/game_bg.jpg');
                this.load.start();
            };
            Preload.prototype.update = function () {
                if (this.ready) {
                    this.game.state.start('game');
                }
            };
            Preload.prototype.onLoadComplete = function () {
                this.ready = true;
            };
            return Preload;
        }(Phaser.State));
        states.Preload = Preload;
    })(states = app.states || (app.states = {}));
})(app || (app = {}));
var game = new app.App();
//# sourceMappingURL=app.js.map