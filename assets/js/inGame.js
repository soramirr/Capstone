var inGame = {
    preload: function() {
        playerLife = maxLife;
        this.load.image("background" + currentLevel, "assets/img/level-" + currentLevel + "/background.png");
        this.load.image("middleground" + currentLevel, "assets/img/level-" + currentLevel + "/middleground.png");
        this.load.image("foreground" + currentLevel, "assets/img/level-" + currentLevel + "/foreground.png");
        this.load.image("glide" + currentLevel, "assets/img/level-" + currentLevel + "/glide.png");
        this.load.image("shoot" + currentLevel, "assets/img/level-" + currentLevel + "/shoot.png");
        //this.load.image("ground" + currentLevel, "assets/img/level-" + currentLevel + "/ground" + currentLevel + ".png");
        this.load.spritesheet("ground" + currentLevel, "assets/img/borrowed/baddie.png", 32, 32);
    },

    create: function() {
        //Background
        var background = "background" + currentLevel;
        var middleground = "middleground" + currentLevel;
        var foreground = "foreground" + currentLevel;
        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, background);
        this.middleground = this.add.tileSprite(0, 0, this.game.width, this.game.height, middleground);
        this.foreground = this.add.tileSprite(0, 16, this.game.width, this.game.height, foreground);
        this.background.autoScroll(-20, 0);
        this.middleground.autoScroll(-30, 0);
        this.foreground.autoScroll(-40, 0);

        //Clouds
        this.cloud1 = this.add.sprite(this.game.width, (Math.random() * 100) + 50,  "cloud1");
        this.cloud2 = this.add.sprite(this.game.width + 200, (Math.random() * 100) + 50,  "cloud2");
        this.cloud3 = this.add.sprite(this.game.width + 500, (Math.random() * 100) + 50,  "cloud3");
        this.physics.arcade.enable(this.cloud1);
        this.physics.arcade.enable(this.cloud2);
        this.physics.arcade.enable(this.cloud3);

        this.cloudGen = function(cloud1, cloud2, cloud3) {
            var cloudNum = Math.ceil(Math.random() * 3);
            var cloudName = "cloud" + cloudNum;
            // console.log(cloudName);
            // console.log(cloud1);
            if(cloudNum == 1) {
            //this.cloud1.autoScroll(Math.random() * -80, 0);
            cloud1.body.velocity.x = Math.random() * -80;
            } else if(cloudNum == 2) {
            //this.cloud2.autoScroll(Math.random() * -80, 0);
            cloud2.body.velocity.x = Math.random() * -80;
            } else {
            //this.cloud3.autoScroll(Math.random() * -80, 0);
            cloud3.body.velocity.x = Math.random() * -80;
            }

            if(cloud1.position.x < -100) {
                cloud1.position.x = this.game.width;
                cloud1.position.y = (Math.random() * 50) + 100;
                cloud1.body.velocity.x = 0;
            }

            if(cloud2.position.x < -100) {
                cloud2.position.x = this.game.width;
                cloud2.position.y = (Math.random() * 50) + 100;
                cloud2.body.velocity.x = 0;
            }

            if(cloud3.position.x < -100) {
                cloud3.position.x = this.game.width;
                cloud3.position.y = (Math.random() * 50) + 100;
                cloud3.body.velocity.x = 0;
            }
        }

        setInterval(this.cloudGen, 5000, this.cloud1, this.cloud2, this.cloud3);

        //Create player
        player = this.add.sprite(50, 50, "player");
        this.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.sprite.anchor.set = 0.5;
        player.body.sprite.scale.x = 0.6;
        player.body.sprite.scale.y = 0.6;

        //Bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(20, "bullet");
        bullets.setAll("outOfBoundsKill", true);
        bullets.setAll("checkWorldBounds", true);

        bullets.fire = function(source) {
            if (this.game.time.time < nextFire) {
                return;
            }

            var x = source.x + 32;
            var y = source.y + 32;

            var bullet = this.getFirstExists(false);
            if(bullet) {
                bullet.reset(x, y);
                bullet.body.velocity.x = 600;
            }

            nextFire = this.game.time.time + fireRate;
        }

        // super.fire = function(source) {
        //     if (scoreReady == true) {
        //         source.reset(player.position.x, player.position.y);
        //         source = this.add.sprite()
        //         setTimeout(super.end, 5000);
        //     }
        // }

        // super.end = function(source) {
        //     source.kill();
        // }

        //Enemy bullets
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(20, "bullet");
        enemyBullets.setAll("outOfBoundsKill", true);
        enemyBullets.setAll("checkWorldBounds", true);

        enemyBullets.fire = function(source) {
            if (this.game.time.time < nextFire) {
                console.log(this.game.time.time);
                return;
            }
            console.log(this.game.time.time);

            var x = source.x + 10;
            var y = source.y + 10;

            var bullet = enemyBullets.getFirstExists(false);
            if(bullet) {
                bullet.reset(x, y);
                bullet.body.velocity.x = -200;
            }

            if(playerDead == false) {
                setTimeout(enemyBullets.fire, 1500, source);
            }
        }

        //Platform to prevent ground enemies from falling through the world
        this.floor = this.add.tileSprite(0, this.game.height, this.game.width, 10, "platform");
        this.physics.arcade.enable(this.floor);
        this.floor.body.immovable = true;

        //Create enemies
        var glide = "glide" + currentLevel;
        var shoot = "shoot" + currentLevel;
        var ground = "ground" + currentLevel;

        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.createMultiple(5, glide);
        enemies.createMultiple(5, shoot);
        enemies.createMultiple(5, ground);
        enemyBullets.setAll("outOfBoundsKill", true);
        enemyBullets.setAll("checkWorldBounds", true);
        enemies.setAll("outOfBoundsKill", true);
        enemies.setAll("checkWorldBounds", true);

        //Rescale enemies
        enemies.setAll("body.sprite.anchor.set", 0.5);
        enemies.setAll("body.sprite.scale.x", 0.6);
        enemies.setAll("body.sprite.scale.y", 0.6);

        customRescale();

        launchEnemies();

        //Populate cursors object
        cursors = game.input.keyboard.createCursorKeys();
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
        this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.input.keyboard.addKey(Phaser.Keyboard.Z);

        //Display score and life count
        scoreDisplay = game.add.text(0, 0, "Score: " + score);
        lifeDisplay = game.add.text(0, 50, "Lives: " + playerLife);
    },

    update: function() {
        player.body.velocity.set(0);

        if(cursors.up.isDown || this.input.keyboard.isDown(Phaser.Keyboard.W)) {
            player.body.velocity.y = -150;
        } else if(cursors.down.isDown || this.input.keyboard.isDown(Phaser.Keyboard.S)) {
            player.body.velocity.y = 150;
        }

        if(cursors.left.isDown || this.input.keyboard.isDown(Phaser.Keyboard.A)) {
            player.body.velocity.x = -150;
        } else if(cursors.right.isDown || this.input.keyboard.isDown(Phaser.Keyboard.D)) {
            player.body.velocity.x = 150;
        }

        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //console.log(this.bullet.elapsed);
            //this.weapons[0].fire(player);
            bullets.fire(player);
            //console.log(this.weapons[0].children[0]);
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.Z) && superReady == true) {
            bullets.fire(player);
            superReady = false;
            score = 0;
            scoreDisplay.text = "Score: " + score;
        }

        //Collision ground enemies and the platform below the game
        this.physics.arcade.collide(enemies, this.floor);
        
        //Check for overlap between bullets and enemies to kill them
        this.physics.arcade.overlap(enemies, bullets, hitEnemy);
        this.physics.arcade.overlap(enemies, player, hurtPlayer);
        this.physics.arcade.overlap(enemyBullets, player, hurtPlayer);
        this.physics.arcade.overlap(enemies, superShot, superHit);

        if (score == 100) {
            superReady = true;
        }

        if(enemiesKilled >= 2) {
            enemiesKilled = 0;
            game.world.removeAll();
            game.state.start("upgrade");
        }
    }
}