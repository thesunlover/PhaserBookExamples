"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.clouds;
        _this.txtScore;
        _this.score;
        return _this;
    }
    Game.prototype.create = function () {
        this.add.sprite(0, 0, "game_bg");
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
exports.Game = Game;
