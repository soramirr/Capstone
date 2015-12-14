var reset = {
	create: function() {
		game.world.removeAll();
		playerLife = 3;
		game.state.start("inGame");
	}
}