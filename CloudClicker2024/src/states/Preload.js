"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />
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
        //background for game
        this.add.sprite(0, 0, "loading_bg");
        this.preloadAsset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
        this.preloadAsset.anchor.setTo(0.5, 0.5);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.preloadAsset);
        //do all your loading here
        this.load.image('cloud', 'assets/images/cloud.png');
        this.load.image('game_bg', 'assets/images/game_bg.jpg');
        //staaaart load
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
exports.__esModule = true;
exports["default"] = Preload;
