var app;
(function (app) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
            this.game.state.add('boot', new app.states.Boot());
            this.game.state.add('preload', new app.states.Preload());
            this.game.state.add('game', new app.states.Game());
            this.game.state.add('gameOver', new app.states.GameOver());
            this.game.state.add('startScreen', new app.states.StartScreen());
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
    var prefabs;
    (function (prefabs) {
        var Enemy = (function (_super) {
            __extends(Enemy, _super);
            function Enemy(game, x, y, bulletLayer, frame) {
                var _this = _super.call(this, game, x, y, 'enemy', frame) || this;
                _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
                _this.body.velocity.x = -175;
                _this.bounceTick = Math.random() * 2;
                _this.bulletLayer = bulletLayer;
                _this.outOfBoundsKill = true;
                _this.willFire = Phaser.Utils.chanceRoll(50);
                console.log(_this.willFire);
                if (_this.willFire) {
                    _this.fireTimer = _this.game.time.create(false);
                    _this.fireTimer.add(3500, _this.fireShot, _this);
                    _this.fireTimer.start();
                }
                return _this;
            }
            Enemy.prototype.fireShot = function () {
                var bullet = this.bulletLayer.create(this.x, this.y, "enemyBullet");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = -250;
            };
            Enemy.prototype.update = function () {
                this.bounceTick += .02;
                this.y += Math.sin(this.bounceTick) * 1;
            };
            return Enemy;
        }(Phaser.Sprite));
        prefabs.Enemy = Enemy;
    })(prefabs = app.prefabs || (app.prefabs = {}));
})(app || (app = {}));
var app;
(function (app) {
    var prefabs;
    (function (prefabs) {
        var HealthBar = (function (_super) {
            __extends(HealthBar, _super);
            function HealthBar(game, xpos, ypos, barGraphic, holderGraphic) {
                var _this = _super.call(this, game) || this;
                _this.x = xpos;
                _this.y = ypos;
                _this.bar = _this.create(0, 0, barGraphic);
                _this.holder = _this.create(0, 0, holderGraphic);
                return _this;
            }
            HealthBar.prototype.setValue = function (val) {
                if (this.tween)
                    this.tween.stop();
                this.tween = this.game.add.tween(this.bar.scale);
                this.tween.to({ x: val }, 350);
                this.tween.start();
            };
            return HealthBar;
        }(Phaser.Group));
        prefabs.HealthBar = HealthBar;
    })(prefabs = app.prefabs || (app.prefabs = {}));
})(app || (app = {}));
var app;
(function (app) {
    var prefabs;
    (function (prefabs) {
        var NumberBox = (function (_super) {
            __extends(NumberBox, _super);
            function NumberBox(game, bgasset, val, parent) {
                var _this = _super.call(this, game, parent) || this;
                _this.create(0, 0, bgasset);
                var style = { font: "30px Arial", align: "center", fill: "#fff" };
                _this.txtValue = new Phaser.Text(_this.game, 55, 55, val.toString(), style);
                _this.txtValue.anchor.setTo(.5, .5);
                _this.add(_this.txtValue);
                return _this;
            }
            NumberBox.prototype.setValue = function (val) {
                this.txtValue.text = val.toString();
            };
            return NumberBox;
        }(Phaser.Group));
        prefabs.NumberBox = NumberBox;
    })(prefabs = app.prefabs || (app.prefabs = {}));
})(app || (app = {}));
var app;
(function (app) {
    var prefabs;
    (function (prefabs) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y, bullets, scale) {
                var _this = _super.call(this, game, x, y, 'player', 0) || this;
                _this.firePosition = new Phaser.Point(160, 100);
                _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
                _this.body.drag.x = 0;
                _this.body.drag.y = 35;
                _this.body.collideWorldBounds = true;
                _this.scale.set(scale);
                _this.speed = 100;
                _this.bulletGate = 0;
                _this.shotInterval = 500;
                _this.bullets = bullets;
                _this.cursors = _this.game.input.keyboard.createCursorKeys();
                _this.fireButton = _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                _this.health = _this.maxHealth = 10;
                _this.animations.add("fly", [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
                _this.fireAnimation = _this.animations.add("fire", [11, 12, 13]);
                _this.fireAnimation.onComplete.add(_this.playFly, _this);
                _this.animations.play("fly", 14, true);
                return _this;
            }
            Player.prototype.update = function () {
                if (this.cursors.left.isDown) {
                    this.body.velocity.x = -this.speed;
                }
                if (this.cursors.right.isDown) {
                    this.body.velocity.x = this.speed;
                }
                if (this.cursors.up.isDown) {
                    this.body.velocity.y = -this.speed;
                }
                if (this.cursors.down.isDown) {
                    this.body.velocity.y = this.speed;
                }
                if (this.fireButton.isDown) {
                    this.fire();
                }
            };
            Player.prototype.fire = function () {
                if (this.game.time.now > this.bulletGate) {
                    var firePoint = new Phaser.Point(this.x + this.firePosition.x * this.scale.x, this.y + this.firePosition.y * this.scale.y);
                    var bullet = this.bullets.getFirstDead();
                    if (bullet) {
                        bullet.x = firePoint.x;
                        bullet.y = firePoint.y;
                        bullet.revive();
                    }
                    else {
                        bullet = this.bullets.create(firePoint.x, firePoint.y, "bullet");
                        bullet.scale.set(this.scale.x);
                        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                        bullet.outOfBoundsKill = true;
                        bullet.checkWorldBounds = true;
                        bullet.body.velocity.x = 250;
                    }
                    this.animations.play("fire");
                    this.bulletGate = this.game.time.now + this.shotInterval;
                }
            };
            Player.prototype.damage = function (amount) {
                this.health -= amount;
                return this;
            };
            Player.prototype.playFly = function () {
                this.animations.play("fly", 14, true);
            };
            return Player;
        }(Phaser.Sprite));
        prefabs.Player = Player;
    })(prefabs = app.prefabs || (app.prefabs = {}));
})(app || (app = {}));
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
                console.log("boot state ready");
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
                console.log("game state ready");
                this.spawnChance = .02;
                this.score = 0;
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.bg = this.game.add.existing(new Phaser.TileSprite(this.game, 0, 0, 1024, 768, 'bg'));
                this.bullets = this.add.group();
                this.enemyBullets = this.add.group();
                this.player = new app.prefabs.Player(this.game, 0, 0, this.bullets, 0.25);
                this.game.add.existing(this.player);
                this.enemies = this.add.group();
                for (var i = 0; i < 5; i++) {
                    var enemy = new app.prefabs.Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
                    this.enemies.add(enemy);
                }
                this.explosions = this.game.add.emitter(0, 0, 200);
                this.explosions.makeParticles("hexagon");
                this.explosions.setAlpha(1, .2, 2000);
                this.setupUI();
                this.waveTimer = this.game.time.create(false);
                this.waveTimer.loop(20000, this.incrementWave, this);
                this.waveTimer.start();
            };
            Game.prototype.setupUI = function () {
                this.UILayer = this.add.group();
                this.scoreField = new app.prefabs.NumberBox(this.game, "circle", 0);
                this.UILayer.add(this.scoreField);
                this.healthBar = new app.prefabs.HealthBar(this.game, 120, 40, "health_bar", "health_holder");
                this.UILayer.add(this.healthBar);
            };
            Game.prototype.update = function () {
                this.bg.tilePosition.x -= .5;
                if (Math.random() < this.spawnChance) {
                    var randomX = this.game.width + 100 + (Math.random() * 400);
                    var randomY = Math.random() * this.game.height;
                    var enemy = new app.prefabs.Enemy(this.game, randomX, randomY, this.enemyBullets);
                    this.enemies.add(enemy);
                }
                this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
                this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
                this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
            };
            Game.prototype.incrementWave = function () {
                this.spawnChance *= 1.2;
            };
            Game.prototype.damagePlayer = function (playerRef, enemyRef) {
                this.player.damage(1);
                this.healthBar.setValue(this.player.health / this.player.maxHealth);
                enemyRef.kill();
                if (this.player.health <= 0) {
                    this.game.state.start('gameOver');
                }
            };
            Game.prototype.damageEnemy = function (enemy, bullet) {
                this.explosions.x = enemy.x;
                this.explosions.y = enemy.y;
                this.explosions.explode(2000, 4);
                enemy.kill();
                bullet.kill();
                this.score++;
                this.scoreField.setValue(this.score);
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
        var GameOver = (function (_super) {
            __extends(GameOver, _super);
            function GameOver() {
                var _this = _super.call(this) || this;
                _this.asset = null;
                _this.ready = false;
                return _this;
            }
            GameOver.prototype.create = function () {
                console.log("GameOver state ready");
            };
            GameOver.prototype.update = function () {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('game');
                }
            };
            return GameOver;
        }(Phaser.State));
        states.GameOver = GameOver;
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
            Preload.prototype.create = function () {
                console.log("preloader state ready");
                this.add.sprite(0, 0, "loading_bg");
                this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
                this.asset.anchor.setTo(0.5, 0.5);
                this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
                this.load.setPreloadSprite(this.asset);
                this.load.image('enemy', 'assets/images/enemy.png');
                this.load.image('explosion', 'assets/images/explosion.png');
                this.load.spritesheet('player', 'assets/images/gunbot.png', 214, 269);
                this.load.image('hexagon', 'assets/images/hexagon_particle.png');
                this.load.image('bullet', 'assets/images/bullet.png');
                this.load.image('enemyBullet', 'assets/images/enemyBullet.png');
                this.load.image('bg', 'assets/images/bg.jpg');
                this.load.image('health_bar', 'assets/images/health_bar.png');
                this.load.image('health_holder', 'assets/images/health_holder.png');
                this.load.image('circle', 'assets/images/circle.png');
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
var app;
(function (app) {
    var states;
    (function (states) {
        var StartScreen = (function (_super) {
            __extends(StartScreen, _super);
            function StartScreen() {
                return _super.apply(this, arguments) || this;
            }
            StartScreen.prototype.create = function () {
                console.log("StartScreen state ready");
            };
            StartScreen.prototype.update = function () {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('game');
                }
            };
            return StartScreen;
        }(Phaser.State));
        states.StartScreen = StartScreen;
    })(states = app.states || (app.states = {}));
})(app || (app = {}));
var game = new app.App();
//# sourceMappingURL=app.js.map