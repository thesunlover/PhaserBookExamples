namespace app.states{
	export class Preload extends Phaser.State {
		public preloadAsset: Phaser.Sprite = null;
		public ready:boolean = false;

		constructor() {
			super();
		}

		public preload() {
			this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
		}

		public create() {
			console.log("preload state ready");

			//background for game
			this.add.sprite(0,0, "loading_bg");

			this.preloadAsset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
			this.preloadAsset.anchor.setTo(0.5, 0.5);

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.preloadAsset);

			//do all your loading here
			this.load.image('cloud', 'assets/images/cloud.png');
			this.load.image('game_bg', 'assets/images/game_bg.jpg');

			//staaaart load
			this.load.start();
		}

		public update() {

			if(this.ready) {
				this.game.state.start('game');
			}

		}

		protected onLoadComplete() {
			this.ready = true;
		}
	}

}
