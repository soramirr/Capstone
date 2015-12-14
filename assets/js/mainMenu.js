var mainMenu = {
	create: function() {
        var playButton = game.add.button(0, 0, "player");
        playButton.onInputUp.add(play, this);
	}
}