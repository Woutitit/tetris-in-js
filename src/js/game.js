import Engine from "./engine.js";

function Game() {
	var previousTime = performance.now();

	this.gameLoop();
};

Game.prototype = {
	gameLoop: function() {

		this.showFPS(this.previousTime);

		Engine.update();
		Engine.render();

		requestAnimationFrame(this.gameLoop.bind(this));
	},


	/**
	* Show the frame rate at which our game loop gets called.
	* @param {Number} previousTime
	*/
	showFPS: function(previousTime) {
		var currentTime = performance.now();
		var FPS = Math.round(1000 / (currentTime - previousTime)); // Calculate how many frames can fit in 1 second based on duration of last frame.
		this.previousTime = currentTime;

		document.getElementById("FPS").innerHTML = FPS;
	}
}

export default Game;