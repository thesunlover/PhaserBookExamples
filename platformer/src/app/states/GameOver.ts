namespace app.states{
	export class GameOver extends Phaser.State {
		txtValue:Phaser.Text;
		public create() {
			this.add.sprite( 0,0,'gameover_bg');

			var style:Phaser.PhaserTextStyle = { font: "30px Arial", align: "center", fill: "#fff" };
			this.txtValue = this.add.text(512, 534, this.game.score.toString() + " points", style);
			this.txtValue.anchor.setTo(.5, .5);
			this.game.input.onDown.addOnce(this.switchState, this);
		}

		protected switchState() {
			this.game.score = 0;
			this.game.state.start("Level1");
		}
	}
}