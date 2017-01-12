namespace app.states{


    export class StartScreen extends Phaser.State {

        public create() {
    		console.log("StartScreen state ready");

        }

        public update() {
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start('game');
            }
        }

    }
}