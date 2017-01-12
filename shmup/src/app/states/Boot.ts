namespace app.states{
	export class Boot extends Phaser.State {
	  preload() {
	    this.load.image('preloader', 'assets/images/loading_bar.png');
			this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
	  }

	  create() {
		console.log("boot state ready");

		this.game.input.maxPointers = 1;
	  this.game.state.start('preload');
	  }
	}
}
