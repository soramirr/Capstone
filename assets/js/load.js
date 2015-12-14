var load = {
	preload: function() {
		//Load images and such before the game begins
		this.load.image("restartButton", "assets/img/gameover.png");
	    this.load.image("platform", "assets/img/borrowed/platform.png");
		this.load.image("bullet", "assets/img/pew.png");
	    this.load.image("cloud1", "assets/img/level-1/cloud-1.png");
	    this.load.image("cloud2", "assets/img/level-1/cloud-2.png");
	    this.load.image("cloud3", "assets/img/level-1/cloud-3.png");
		this.load.image("player", "assets/img/hero.png");
	},
	
	create: function() {
    //Enable physics engine
    this.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start("mainMenu");
	}
}