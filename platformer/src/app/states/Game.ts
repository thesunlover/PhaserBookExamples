namespace Phaser {
	export interface Game{
		score:number;
	}
}
namespace app.states{
	export class Game extends Phaser.State {

		public create() {
			this.game.score = 0;
			this.game.state.start("Level1");
		}

	}
}