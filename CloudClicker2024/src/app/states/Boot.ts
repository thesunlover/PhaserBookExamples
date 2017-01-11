namespace app.states{
	export class Boot extends Phaser.State {
	  preload() {
	    this.load.image('preloader', 'assets/images/loading_bar.png');
	  }

	  create() {
			console.log("boot state ready");

	    this.game.state.start('preload');
	  }
	}
}
