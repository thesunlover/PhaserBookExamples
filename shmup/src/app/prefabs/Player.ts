namespace app.prefabs{

	export class Player extends Phaser.Sprite { 

        protected speed:number;
        protected bulletGate:number;
        protected shotInterval:number;
        protected bullets:Phaser.Group;
        protected cursors:Phaser.CursorKeys;
        protected fireButton:Phaser.Key;
        // defined in protected Phaser.Sprite health:{current:number, max:number};
        protected firePosition = new Phaser.Point(160, 100);
        protected fireAnimation:Phaser.Animation;

		constructor(game:Phaser.Game, x:number, y:number, bullets:Phaser.Group, scale:number) {  

            super(game, x, y, 'player', 0);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.drag.x = 0;
            this.body.drag.y = 35;
            this.body.collideWorldBounds = true;
			this.scale.set(scale);

            // initialize your prefab herea
            this.speed = 100;
            this.bulletGate = 0;
            this.shotInterval = 500;
            this.bullets = bullets;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


            this.health = this.maxHealth = 10;

            this.animations.add("fly", [0,0,1,1,2,2,3,4,5,6,7,8,9,10,10]);
            this.fireAnimation = this.animations.add("fire", [11,12,13]);
            this.fireAnimation.onComplete.add(this.playFly, this);
            this.animations.play("fly", 14, true);
		}

		public update() {


			// write your prefab's specific update code here
			if(this.cursors.left.isDown) {
				this.body.velocity.x = -this.speed;
			}

			if(this.cursors.right.isDown) {
				this.body.velocity.x = this.speed;
			}

			if(this.cursors.up.isDown) {
				this.body.velocity.y = -this.speed;
			}

			if(this.cursors.down.isDown) {
				this.body.velocity.y = this.speed;
			}

			if(this.fireButton.isDown) {
				this.fire();
			}
		}

		protected fire() {
			if(this.game.time.now > this.bulletGate) {

				var firePoint:Phaser.Point = new Phaser.Point(this.x + this.firePosition.x*this.scale.x, this.y + this.firePosition.y*this.scale.y );
				var bullet:Phaser.Sprite = this.bullets.getFirstDead();
				if(bullet) {
					bullet.x = firePoint.x;
					bullet.y = firePoint.y;
					bullet.revive();
				} else {
					bullet = this.bullets.create(firePoint.x, firePoint.y, "bullet");
					bullet.scale.set(this.scale.x);

					this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
					bullet.outOfBoundsKill = true;
					bullet.checkWorldBounds = true;
					bullet.body.velocity.x = 250;
				}

				this.animations.play("fire");

				this.bulletGate = this.game.time.now + this.shotInterval;
				
			}
		}

		public damage(amount:number): Phaser.Sprite {
			this.health -= amount;
            return this;
		}

		protected playFly() {
			this.animations.play("fly", 14, true);
		}
	}
}
