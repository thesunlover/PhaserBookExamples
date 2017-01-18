var app;
(function (app) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
            this.game.state.add('boot', new app.states.Boot);
            this.game.state.add('preload', new app.states.Preload);
            this.game.state.add('game', new app.states.Game);
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
                this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
            };
            Boot.prototype.create = function () {
                this.game.input.maxPointers = 1;
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
                this.pulling = false;
                this.launched = false;
                this.round = 0;
                this.score = 0;
                this.physics.startSystem(Phaser.Physics.P2JS);
                this.world.setBounds(0, 0, 3000, 768);
                this.bg = this.add.sprite(0, 0, 'bg');
                this.bg.fixedToCamera = true;
                this.forceLine = this.add.graphics(0, 0);
                this.comet = this.add.sprite(300, 330, 'comet');
                this.comet.anchor.set(.5, .5);
                this.physics.p2.enable(this.comet);
                this.comet.body.setCircle(40, 140, -10);
                this.comet.inputEnabled = true;
                this.asteroids = this.add.group();
                this.asteroids.enableBody = true;
                this.asteroids.physicsBodyType = Phaser.Physics.P2JS;
                this.trail = this.add.emitter(this.comet.x, this.comet.y);
                this.trail.makeParticles(['particle1', 'particle2']);
                this.trail.start(false, 3000, 50);
                this.trail.setAlpha(1, 0, 3000);
                this.trail.setScale(0.4, 1, 0.4, 1, 4000);
                this.add.sprite(0, 0, 'fg');
                var style = { font: "30px Arial", fill: "#FFF" };
                this.txtScore = this.add.text(20, 20, "Round 0, Score 0", style);
                this.txtScore.fixedToCamera = true;
                this.camera.follow(this.comet);
                this.resetBoard();
            };
            Game.prototype.startPull = function () {
                this.pulling = true;
                this.game.input.onUp.addOnce(this.endPull, this);
            };
            Game.prototype.endPull = function () {
                this.pulling = false;
                this.launched = true;
                var forceLine = new Phaser.Line(this.input.activePointer.x, this.input.activePointer.y, this.comet.x, this.comet.y);
                this.comet.body.motionState = Phaser.Physics.P2.Body.DYNAMIC;
                this.comet.body.velocity.x = Math.cos(forceLine.angle) * forceLine.length * 6;
                this.comet.body.velocity.y = Math.sin(forceLine.angle) * forceLine.length * 2;
                this.forceLine.clear();
                this.time.events.add(5500, this.resetBoard, this);
            };
            Game.prototype.resetBoard = function () {
                this.launched = false;
                this.comet.body.reset();
                this.comet.body.rotation = 0;
                this.comet.body.motionState = Phaser.Physics.P2.Body.STATIC;
                this.comet.events.onInputDown.addOnce(this.startPull, this);
                this.comet.body.x = 300;
                this.comet.body.y = 370;
                this.asteroids.removeAll(true);
                this.asteroids.create(2800, 400, 'asteroid');
                this.asteroids.create(2500, 200, 'asteroid');
                this.asteroids.create(2200, 500, 'asteroid');
                this.asteroids.create(2200, 200, 'asteroid');
                this.asteroids.create(2600, 600, 'asteroid');
                this.asteroids.create(1800, 600, 'asteroid');
                this.asteroids.create(1600, 300, 'asteroid');
                this.asteroids.forEach(function (asteroid) {
                    asteroid.body.mass = .7;
                    asteroid.checkWorldBounds = true;
                    asteroid.body.setCircle(75);
                    asteroid.events.onOutOfBounds.addOnce(this.killedAsteroid, this);
                }, this);
                this.round++;
                this.txtScore.text = "Round: " + this.round + " Score: " + this.score;
            };
            Game.prototype.killedAsteroid = function () {
                this.score++;
            };
            Game.prototype.update = function () {
                if (this.pulling) {
                    this.forceLine.clear();
                    this.forceLine.lineStyle(10, 0xffffff, .8);
                    this.forceLine.moveTo(this.input.activePointer.x, this.input.activePointer.y);
                    this.forceLine.lineTo(this.comet.x, this.comet.y);
                }
                if (this.launched) {
                    this.comet.body.force.y = 270;
                }
                this.trail.x = this.comet.x;
                this.trail.y = this.comet.y;
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
                _this.asset = null;
                _this.ready = false;
                return _this;
            }
            Preload.prototype.preload = function () {
            };
            Preload.prototype.create = function () {
                this.add.sprite(0, 0, "loading_bg");
                this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
                this.asset.anchor.setTo(0.5, 0.5);
                this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
                this.load.setPreloadSprite(this.asset);
                this.load.image('bg', 'assets/images/smasherBG.jpg');
                this.load.image('particle1', 'assets/images/comet_particle1.png');
                this.load.image('particle2', 'assets/images/comet_particle2.png');
                this.load.image('comet', 'assets/images/comet.png');
                this.load.image('asteroid', 'assets/images/asteroid.png');
                this.load.image('fg', 'assets/images/smasherForeground.png');
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