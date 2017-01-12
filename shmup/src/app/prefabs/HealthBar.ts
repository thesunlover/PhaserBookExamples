namespace app.prefabs{
	export class HealthBar extends Phaser.Group {
		protected bar:Phaser.Sprite;
		protected holder:Phaser.Sprite;
		protected tween:Phaser.Tween;

		constructor(game:Phaser.Game, xpos:number, ypos:number, barGraphic:string, holderGraphic:string) {  

			super(game);

			this.x = xpos;
			this.y = ypos;

			this.bar = this.create(0,0, barGraphic);
			this.holder = this.create(0,0, holderGraphic);
		}

		setValue(val:number) {
			if(this.tween) this.tween.stop();
			this.tween = this.game.add.tween(this.bar.scale);
			this.tween.to({ x: val }, 350);
			this.tween.start();
		}

	}
}