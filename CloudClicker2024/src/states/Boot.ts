/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />
namespace states{

	export declare class Boot extends Phaser.State {
	  preload() {
	    this.load.image('preloader', 'assets/images/loading_bar.png');
	  }

	  create() {
	    this.game.state.start('preload');
	  }
	}
}
