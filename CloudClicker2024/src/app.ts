/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="./states/Boot.ts" />
/// <reference path="./states/Preload.ts" />
/// <reference path="./states/Game.ts" />

var game;

window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('boot', new Boot());
  game.state.add('preload', new Preload());
  game.state.add('game', new Game());
  game.state.start('boot');
};
