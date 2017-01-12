namespace app.states{
	export class Preload extends Phaser.State {

		protected ready:boolean;
		protected asset:Phaser.Sprite;

		constructor() {
			super();
			this.asset = null;
			this.ready = false;
		}

		public create() {
    		console.log("preloader state ready");

			//background for game
			this.add.sprite(0,0, "loading_bg");

			this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
			this.asset.anchor.setTo(0.5, 0.5);

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.asset);

			//do all your loading here
			//this.load.image('player', 'assets/images/player.png'); //width and height of sprite
			this.load.image('enemy', 'assets/images/enemy.png');
			this.load.image('explosion', 'assets/images/explosion.png');

			this.load.spritesheet('player', 'assets/images/gunbot.png', 214, 269); //width and height of sprite
			this.load.image('hexagon', 'assets/images/hexagon_particle.png');
			this.load.image('bullet', 'assets/images/bullet.png');
			this.load.image('enemyBullet', 'assets/images/enemyBullet.png');
			this.load.image('bg', 'assets/images/bg.jpg');

			this.load.image('health_bar', 'assets/images/health_bar.png');
			this.load.image('health_holder', 'assets/images/health_holder.png');
			this.load.image('circle', 'assets/images/circle.png');

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