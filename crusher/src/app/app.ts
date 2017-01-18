namespace app{
	export class App{
		public game:Phaser.Game;
		constructor(){
			this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
			this.game.state.add('boot', new states.Boot);
			this.game.state.add('preload', new states.Preload);
			this.game.state.add('game', new states.Game);

			this.game.state.start('boot');
		}
	}
}