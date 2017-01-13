namespace app.states{
	export class Level1 extends base.Level {
		constructor() {
			super();
			//object level properties
			this.config = {mapNameTileMap:"level1", numberOfCollectables: 41, numberOfEnemies: 25};
		}

		protected hitDoor(playerRef:prefabs.Player, doorRef:Phaser.Sprite) {
			this.game.state.clearCurrentState();
			this.game.state.start("Level2");
		}

	}
}