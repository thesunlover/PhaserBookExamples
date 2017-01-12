namespace app.states {
	export class GameOver extends Phaser.State {

		protected ready:boolean;
		protected asset:Phaser.Sprite;

		constructor() {
			super();
			this.asset = null;
			this.ready = false;
		}

        create() {
    		console.log("GameOver state ready");
        }

        update() {
            
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start('game');
            }
        }

    }
}