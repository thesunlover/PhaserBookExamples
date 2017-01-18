namespace app.states {
	export class GameOver extends Phaser.State {

		protected txtValue:Phaser.Text;

		constructor() {
			super();
		}

        public create() {
    		console.log("GameOver state ready");
			this.add.sprite( 0,0,'bg');

			var style:Phaser.PhaserTextStyle = { font: "30px Arial", align: "center", fill: "#fff" };
			this.txtValue = this.add.text(512, 534, this.game.score.toString() + " points", style);
			this.txtValue.anchor.setTo(.5, .5);
        }

        public update() {

            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start('game');
            }
        }

    }
}