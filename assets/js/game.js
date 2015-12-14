//Array shuffler
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var game = new Phaser.Game(800, 400, Phaser.AUTO, "game");


//Declare variables
var player;
var enemies;
var bullets;
var enemyBullets;
var nextFire = 0;
var fireRate = 500;
var playerLife;
var playerImmune = false;
var score = 0;
var scoreDisplay;
var lifeDisplay;
var scrap;
var currentLevel = 0;
var maxLife = 3;
var playerDamage = 1;
var playerDead = false;
var enemiesKilled = 0;
var superShot;
var superReady = false;
var superDamage = 0.1;

//DEBUG
scrap = 1000000;

var upgrades = [];
var fireRateUp = ["Fire Rate", 100, 5, 100];
upgrades[0] = fireRateUp;
var lifeUp = ["Max Life", 300, 5, 300];
upgrades[1] = lifeUp;
var damageUp = ["Damage", 250, 9, 250];
upgrades[2] = damageUp;


    function launchEnemies() {

        var enemy = enemies.getFirstExists(false);
        shuffle(enemies.children);
        if(enemy) {
            if(enemy.key.indexOf("ground") > -1) {
                enemy.reset(game.width - 50, game.height - 32);
                enemy.life = 2;
            } else if(enemy.key.indexOf("glide") > -1) {
                //Sloog
                if(enemy.key == "glide2") {
                    enemy.reset(game.width - 50, 32);
                } else {
                    enemy.reset(game.width - 50, Math.random() * (game.height - 32));
                }
                enemy.life = 2;
            } else if(enemy.key.indexOf("shoot") > -1) {
                enemy.reset(game.width - 50, Math.random() * (game.height - 32));
                enemy.life = 2;
            }
            enemy.body.velocity.x = -50;
            if(enemy.key == "glide2") {
                enemy.body.acceleration.x = -150;
            }
            if(enemy.key.indexOf("ground") > -1) {
                hopUp(enemy, this.hopWait, this.hopUp, this.hopDown);
            }
            if(enemy.key.indexOf("shoot") > -1) {
                enemyBullets.fire(enemy);
            }
        }

        var interval = Math.random() * 6500 + 500;

        game.time.events.add(interval, launchEnemies);
    }

    function killEnemy(enemy) {
        enemy.kill();
        scrap += 50;
        enemiesKilled++;
    }

    function hitEnemy(enemy, bullet) {
        if (score < 100) {
            score += 50;
            scoreDisplay.text = "Score: " + score;
            if (score >= 100) {
                score = 100;
            }
        }
        enemy.life -= playerDamage;
        bullet.kill();
        if (enemy.life <= 0) {
            killEnemy(enemy);
        }
    }

    function superHit(enemy) {
        enemy.life -= playerDamage;
        if (enemy.life <= 0) {
            killEnemy(enemy);
        }
    }

    function hurtPlayer(player, enemy) {
        if(playerImmune) {
            return;
        }
        playerLife--;
        if(playerLife <= 0) {
            playerDead = true;
            game.world.removeAll();
            game.state.start("gameover");
            return;
        }
        //Make player unhittable arrayorarily
        playerImmune = true;
        setTimeout(function() {
            playerImmune = false;
        }, 3000);
        lifeDisplay.text = "Lives: " + playerLife;
        immuneFlash();
        enemy.kill();
    }

    function hopUp(enemy1, hopWait, hopUp, hopDown) {
        enemy1.body.velocity.y = -200;
        setTimeout(hopDown, 500, enemy1, hopWait, hopUp, hopDown);
    }

    function hopDown(enemy1, hopWait, hopUp, hopDown) {
        enemy1.body.velocity.y = 200;
        setTimeout(hopWait, 500, enemy1, hopWait, hopUp, hopDown);
    }

    function hopWait(enemy1, hopWait, hopUp, hopDown) {
        enemy1.body.velocity.y = 0;
        //Reset position incase lag makes it not go all the way down
        enemy1.position.y = this.game.height - 32;
        setTimeout(hopUp, 500, enemy1, hopWait, hopUp, hopDown);
    }

    function immuneFlash() {
        for(i = 0; i < 3; i++) {
            setTimeout(function () {
                setTimeout(function () {
                    player.alpha = 0;
                    setTimeout(function() {
                        player.alpha = 1;
                    }, 100);
                }, 800);
            }, 100 + (i * 1000));
        }
    }

    function customRescale() {
        for (i = 0; i < enemies.children.length; i++) {
            if(enemies.children[i].key == "shoot1" || enemies.children[i].key == "shoot2") {
                enemies.children[i].body.sprite.scale.x = 1.2;
                enemies.children[i].body.sprite.scale.y = 1.2;
            }
        }
    }

    function play() {
        currentLevel++;
        game.state.start("inGame");
    }

    function populateUpgrades() {
        game.world.removeAll();
        var playButton = game.add.button(200, 0, "player");
        playButton.onInputUp.add(play, this);

        game.add.text(0, 0, "Scrap: " + scrap, {fill: "white"});

        var upgradeButton = [];
        for (i = 0; i < upgrades.length; i++) {
            var array = upgrades[i];
            upgradeButton[i] = game.add.button(200 * i, 200, "glide1")
            upgradeButton[i].variable = i;
            upgradeButton[i].onInputUp.add(buyUpgrade, this);
            game.add.text(200 * i, 300, array[0], {fill: "white"});
            game.add.text(200 * i, 340, array[1], {fill: "white"});
        }
    }

    function buyUpgrade(index) {
        var i = index.variable;
        var array = upgrades[i];
        if (scrap < array[1] || array[2] <= 0) {
            return;
        }
            array[2]--;
            scrap -= array[1];
            if(array[2] > 0) {
                array[1] += array[3];
            } else {
                array[1] = "---";
            }

        if (array[0] == "Fire Rate") {
            fireRate -= 60;
        }
        if (array[0] == "Max Life") {
            maxLife++;
        }
        if (array[0] == "Damage") {
            playerDamage++;
        }
        populateUpgrades();
    }

    function restart() {
        game.state.start("reset");
    }

//Create game states
game.state.add("load", load);
game.state.add("mainMenu", mainMenu);
game.state.add("upgrade", upgrade);
game.state.add("pause", pause);
game.state.add("gameover", gameover);
game.state.add("inGame", inGame);
game.state.add("reset", reset);

game.state.start("load");