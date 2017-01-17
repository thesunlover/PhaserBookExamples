var app;
(function (app) {
    var App = (function () {
        function App() {
            this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
            this.game.state.add('boot', new app.states.Boot());
            this.game.state.add('preload', new app.states.Preload());
            this.game.state.add('game', new app.states.Game());
            this.game.state.add('Level1', new app.states.Level1);
            this.game.state.add('Level2', new app.states.Level2);
            this.game.state.add('GameOver', new app.states.GameOver());
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
        var Mouse = (function (_super) {
            __extends(Mouse, _super);
            function Mouse(game, x, y, player) {
                var _this = _super.call(this, game, x, y, 'mouse', 0) || this;
                _this.speed = 200;
                _this.jumpPower = 600;
                _this.stepLimit = 90;
                _this.facing = 0;
                _this.currentStep = Math.floor(Math.random() * _this.stepLimit);
                _this.player = player;
                _this.animations.add("stand", [0]);
                _this.swingAnimation = _this.animations.add("swing", [0, 1, 2, 3, 4, 5, 6, 7]);
                _this.animations.add("run", [8, 9, 10, 11, 12, 13, 14]);
                _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
                _this.body.collideWorldBounds = true;
                _this.body.setSize(60, 120);
                _this.anchor.setTo(.5, 1);
                _this.animations.play("run", 9, true);
                _this.anchor.setTo(0.44, _this.anchor.y);
                _this.body.setSize(60, 120);
                _this.body.offset.setTo(39, 35);
                return _this;
            }
            Mouse.prototype.update = function () {
                var dist = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y);
                if (Math.round(dist) < 210) {
                    this.animations.play("swing", 9);
                    if (this.x < this.player.x) {
                        this.scale.x = 1;
                    }
                    else {
                        this.scale.x = -1;
                    }
                }
                if (!this.swingAnimation.isPlaying) {
                    this.currentStep++;
                    this.body.velocity.x = this.speed;
                    this.animations.play("run", 9, true);
                    this.scale.x = (this.speed > 0) ? 1 : -1;
                    if (this.currentStep >= this.stepLimit) {
                        this.speed *= -1;
                        this.currentStep = 0;
                    }
                }
            };
            return Mouse;
        }(Phaser.Sprite));
        prefabs.Mouse = Mouse;
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
            function Player(game, x, y) {
                var _this = _super.call(this, game, x, y, 'player', 0) || this;
                _this.speed = 400;
                _this.airSpeed = 300;
                _this.jumpPower = 600;
                _this.inAir = true;
                _this.hitGround = false;
                _this.animations.add("idle", [0, 1, 2, 3, 4, 3, 2, 1]);
                _this.animations.add("jump", [0, 5, 6, 7, 8, 9]);
                _this.landAnimation = _this.animations.add("land", [7, 6, 5]);
                _this.animations.add("run", [11, 12, 13, 14, 15, 16, 17]);
                _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
                _this.body.collideWorldBounds = true;
                _this.anchor.setTo(0.6, _this.anchor.y);
                _this.body.setSize(77, 195);
                _this.body.offset.setTo(89, 15);
                _this.cursors = _this.game.input.keyboard.createCursorKeys();
                _this.jumpButton = _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                _this.jumpButton.onDown.add(_this.jump, _this);
                _this.animations.play("idle", 9, true);
                _this.flashEffect = _this.game.add.tween(_this)
                    .to({ alpha: 0 }, 50, Phaser.Easing.Bounce.Out)
                    .to({ alpha: .8 }, 50, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 1 }, 150, Phaser.Easing.Circular.Out);
                return _this;
            }
            Player.prototype.animationState = function () {
                if (this.hitGround) {
                    this.animations.play("land", 15);
                }
                else if (!this.inAir && !this.landAnimation.isPlaying) {
                    if (Math.abs(this.body.velocity.x) > 4) {
                        this.animations.play("run", 9, true);
                    }
                    else if (this.body.onFloor()) {
                        this.animations.play("idle", 9, true);
                    }
                }
            };
            Player.prototype.update = function () {
                this.hitGround = false;
                var wasAir = this.inAir;
                this.inAir = !this.body.onFloor();
                if (this.inAir != wasAir && this.body.velocity > 0) {
                    this.hitGround = true;
                }
                this.animationState();
                this.speedToUse = this.inAir ? this.airSpeed : this.speed;
                this.speedToUse *= Math.abs(this.scale.x);
                if (!this.cursors.left.isUp && this.cursors.left.isDown && !this.cursors.right.isDown) {
                    this.scale.x = -1;
                    this.body.velocity.x = -this.speedToUse;
                }
                else if (this.cursors.right.isDown) {
                    this.scale.x = 1;
                    this.body.velocity.x = this.speedToUse;
                }
            };
            Player.prototype.jump = function () {
                if (this.body.onFloor() == true) {
                    this.body.velocity.y = -this.jumpPower;
                    this.animations.play("jump", 30);
                    this.doubleJump = true;
                }
                else if (this.doubleJump == true) {
                    console.log(this.doubleJump);
                    this.doubleJump = false;
                    this.body.velocity.y = -this.jumpPower;
                    this.animations.play("jump", 30);
                }
            };
            Player.prototype.flash = function () {
                if (!this.flashEffect.isRunning) {
                    this.flashEffect.start();
                }
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
        var base;
        (function (base) {
            var Level = (function (_super) {
                __extends(Level, _super);
                function Level() {
                    return _super.call(this) || this;
                }
                Level.prototype.create = function () {
                    this.physics.startSystem(Phaser.Physics.ARCADE);
                    this.physics.arcade.gravity.y = 800;
                    this.map = this.add.tilemap(this.config.mapNameTileMap);
                    this.map.addTilesetImage('gamebg');
                    this.bg = this.map.createLayer('bg');
                    this.bg.scrollFactorX = .6;
                    this.bg.scrollFactorY = .6;
                    this.map.addTilesetImage('Tiles');
                    this.layer = this.map.createLayer('Level');
                    this.layer.resizeWorld();
                    this.map.setCollisionBetween(6, 20, true, this.layer);
                    this.coins = this.add.group();
                    this.coins.physicsBodyType = Phaser.Physics.ARCADE;
                    this.coins.enableBody = true;
                    this.map.createFromObjects("Collectables", this.config.numberOfCollectables, 'coin', null, true, false, this.coins);
                    this.coins.setAll("body.gravity", 0);
                    this.doors = this.add.group();
                    this.doors.physicsBodyType = Phaser.Physics.ARCADE;
                    this.doors.enableBody = true;
                    this.map.createFromObjects("Doors", 242, 'sign', null, true, false, this.doors);
                    this.doors.setAll("body.gravity", 0);
                    this.map.createFromObjects("Player", 243, null, null, true, false, this.world, app.prefabs.Player);
                    this.player = this.world.getTop();
                    this.enemies = this.add.group();
                    this.map.createFromObjects("Enemies", this.config.numberOfEnemies, null, null, true, false, this.enemies, app.prefabs.Mouse);
                    this.enemies.setAll("player", this.player);
                    this.UIGroup = this.add.group();
                    this.scoreField = new app.prefabs.NumberBox(this.game, "scoreholder", this.game.score, this.UIGroup);
                    this.scoreField.fixedToCamera = true;
                    this.sfx = this.add.audioSprite('sfx');
                    this.camera.follow(this.player);
                };
                Level.prototype.update = function () {
                    this.physics.arcade.collide(this.player, this.layer);
                    this.physics.arcade.collide(this.enemies, this.layer);
                    this.physics.arcade.overlap(this.player, this.doors, this.hitDoor, null, this);
                    this.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
                    this.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
                    this.addDebug();
                };
                Level.prototype.addDebug = function () {
                    this.game.debug.body(this.player, "rgba(0,0,255,0.4)");
                    this.enemies.forEach(function (child, color) {
                        this.game.debug.body(child, color);
                    }, this, true, "rgba(255,0,0,0.4)");
                    this.doors.forEach(function (child, color) {
                        this.game.debug.body(child, color);
                    }, this, true, "rgba(255,100,50,0.4)");
                };
                Level.prototype.collectCoin = function (playerRef, coinRef) {
                    coinRef.kill();
                    this.game.score++;
                    this.scoreField.setValue(this.game.score);
                    this.sfx.play("coin");
                };
                Level.prototype.hitDoor = function (playerRef, doorRef) {
                };
                Level.prototype.hitEnemy = function (playerRef, enemyRef) {
                    if (!playerRef.flashEffect.isRunning) {
                        playerRef.flash();
                        this.sfx.play("hit");
                        if (this.game.score > 0) {
                            this.game.score--;
                            this.scoreField.setValue(this.game.score);
                        }
                    }
                };
                return Level;
            }(Phaser.State));
            base.Level = Level;
        })(base = states.base || (states.base = {}));
    })(states = app.states || (app.states = {}));
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
                return _super.apply(this, arguments) || this;
            }
            Game.prototype.create = function () {
                this.game.score = 0;
                this.game.state.start("Level1");
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
                return _super.apply(this, arguments) || this;
            }
            GameOver.prototype.create = function () {
                this.add.sprite(0, 0, 'gameover_bg');
                var style = { font: "30px Arial", align: "center", fill: "#fff" };
                this.txtValue = this.add.text(512, 534, this.game.score.toString() + " points", style);
                this.txtValue.anchor.setTo(.5, .5);
                this.game.input.onDown.addOnce(this.switchState, this);
            };
            GameOver.prototype.switchState = function () {
                this.game.score = 0;
                this.game.state.start("Level1");
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
        var Level1 = (function (_super) {
            __extends(Level1, _super);
            function Level1() {
                var _this = _super.call(this) || this;
                _this.config = { mapNameTileMap: "level1", numberOfCollectables: 41, numberOfEnemies: 25 };
                return _this;
            }
            Level1.prototype.hitDoor = function (playerRef, doorRef) {
                this.game.state.clearCurrentState();
                this.game.state.start("Level2");
            };
            return Level1;
        }(states.base.Level));
        states.Level1 = Level1;
    })(states = app.states || (app.states = {}));
})(app || (app = {}));
var app;
(function (app) {
    var states;
    (function (states) {
        var Level2 = (function (_super) {
            __extends(Level2, _super);
            function Level2() {
                var _this = _super.call(this) || this;
                _this.config = { mapNameTileMap: "level2", numberOfCollectables: 241, numberOfEnemies: 225 };
                return _this;
            }
            Level2.prototype.hitDoor = function (playerRef, doorRef) {
                this.game.state.start("GameOver");
            };
            return Level2;
        }(states.base.Level));
        states.Level2 = Level2;
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
                this.load.spritesheet('player', 'assets/images/sprites/FoxSprite.png', 210, 210);
                this.load.spritesheet('mouse', 'assets/images/sprites/MouseSprite.png', 165, 160);
                this.load.image('gamebg', 'assets/images/Background.png');
                this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
                this.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
                this.load.image('Tiles', 'assets/images/Tiles.png');
                this.load.image('coin', 'assets/images/coin.png');
                this.load.image('scoreholder', 'assets/images/scoreholder.png');
                this.load.image('sign', 'assets/images/sign.png');
                this.load.image('gameover_bg', 'assets/images/gameover_bg.png');
                this.load.audiosprite('sfx', ['assets/sounds/sfx.mp3', 'assets/sounds/sfx.ogg'], "assets/sounds/sfx.json");
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