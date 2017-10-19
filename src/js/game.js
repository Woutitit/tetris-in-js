var game = {
	init() {
		var gameArea = document.getElementById('gameArea');
		var context = gameArea.getContext("2d");

		context.fillRect(20,20,20,20);	
	}
}

export default game;