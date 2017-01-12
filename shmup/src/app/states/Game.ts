namespace app.states{
	export class Game extends Phaser.State {
		protected bg: Phaser.TileSprite;
		protected scoreField: prefabs.NumberBox;
		protected score: number;

        protected player:prefabs.Player;
		protected healthBar: prefabs.HealthBar;
		protected bullets: Phaser.Group;

		protected enemies: Phaser.Group;
		protected enemyBullets: Phaser.Group;

		protected UILayer: Phaser.Group;

        protected explosions: Phaser.Particles.Arcade.Emitter;

        protected waveTimer:Phaser.Timer;

        protected spawnChance:number;

		constructor() {
			super();
		}

		public create() {
			console.log("game state ready");

			this.spawnChance = .02;
			this.score = 0;

			this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.bg = this.game.add.existing(new Phaser.TileSprite(this.game, 0, 0, 1024, 768, 'bg'));

			this.bullets = this.add.group();
			this.enemyBullets = this.add.group();

			//add player
			this.player = new prefabs.Player(this.game, 0, 0, this.bullets, 0.25);
			this.game.add.existing(this.player);
			
			//add a few enemeis..
			this.enemies = this.add.group();
			for(var i = 0; i < 5; i++) {
				var enemy = new prefabs.Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
				this.enemies.add(enemy);
			}

			//add the explosions
			this.explosions = this.game.add.emitter(0,0, 200);
			this.explosions.makeParticles("hexagon");
			this.explosions.setAlpha(1, .2, 2000);

			//add UI
			this.setupUI();

			//wave timer
			this.waveTimer = this.game.time.create(false);
			this.waveTimer.loop(20000, this.incrementWave, this);
			this.waveTimer.start();
		}
	
		protected setupUI() {
			this.UILayer = this.add.group();

			this.scoreField = new prefabs.NumberBox(this.game, "circle", 0);
			this.UILayer.add(this.scoreField);

			this.healthBar = new prefabs.HealthBar(this.game, 120, 40, "health_bar", "health_holder");
			this.UILayer.add(this.healthBar);
		}

		public update() {
			this.bg.tilePosition.x -= .5;

			if(Math.random() < this.spawnChance) {
				var randomX:number = this.game.width + 100 + (Math.random() * 400);
				var randomY:number = Math.random() * this.game.height;
				var enemy:prefabs.Enemy = new prefabs.Enemy(this.game, randomX, randomY, this.enemyBullets);
				this.enemies.add(enemy);
			}

			this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
			this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
			this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
		}

		protected incrementWave() {
			this.spawnChance *= 1.2;
		}

		protected damagePlayer(playerRef:prefabs.Player, enemyRef:prefabs.Enemy) {
			this.player.damage(1);
			this.healthBar.setValue(this.player.health / this.player.maxHealth);
			enemyRef.kill();

			if(this.player.health <= 0) {
				this.game.state.start('gameOver');
			}
		}

		protected damageEnemy(enemy:prefabs.Enemy, bullet:Phaser.Sprite) {
			
			this.explosions.x = enemy.x;
			this.explosions.y = enemy.y;

			this.explosions.explode(2000, 4);

			enemy.kill();
			bullet.kill();

			this.score++;
			this.scoreField.setValue(this.score);
		}
    }
}
