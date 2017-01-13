namespace app.states{
	export class Level2 extends base.Level {
		constructor() {
			super();
			//object level properties
			this.config = {mapNameTileMap:"level2", numberOfCollectables: 241, numberOfEnemies: 225};
		}

		protected hitDoor(playerRef:prefabs.Player, doorRef:Phaser.Sprite) {
			this.game.state.start("GameOver");
		}

	}
}