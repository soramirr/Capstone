var gameover = {
	create: function() {
		enemiesKilled = 0;
		game.stage.backgroundColor = '#000000';

        var restartButton = game.add.button(0, 0, "restartButton");
        restartButton.onInputUp.add(restart, this);
	}
}