namespace app.states{
	export class Game extends Phaser.State {
		public background: Phaser.Sprite;
		public clouds: Phaser.Group;
		public txtScore: Phaser.Text;
		public score: number;

		constructor() {
			super();
		}

		public create() {
			console.log("game state ready");

			// this.game.add.sprite(0,0,"game_bg");

			this.background = this.game.add.existing(new Phaser.Sprite(this.game,0,0,"game_bg"));
			// this.game.add.existing(s)
			// this.add.sprite(0,0,"game_bg");
			this.clouds = this.add.group();

			this.score = 0;
			var style = { font: "24px Arial", fill: "#FFFFFF" };
			this.txtScore = this.add.text(10,10,this.score.toString(), style);
		}

		public update() {
			if(Math.random() < .01) {
				var cloud = this.clouds.getFirstDead();
				if(cloud) {
					cloud.x = Math.random() * this.game.width;
					cloud.y = Math.random() * this.game.height;
					cloud.revive();
				} else {
					var cloud = this.clouds.create(Math.random() * this.game.width, Math.random() * this.game.height, "cloud");
					cloud.inputEnabled = true;
					cloud.events.onInputDown.add(this.onCloudClick, this);
				}

				cloud.alpha = 0;
				this.add.tween(cloud).to({ y: "-50", alpha: 1 }, 800, Phaser.Easing.Cubic.Out, true);
			}
		}

		protected onCloudClick(cloud:Phaser.Sprite) {
			cloud.kill();
			this.score ++;
			this.txtScore.setText(this.score.toString());
		}
	}
}