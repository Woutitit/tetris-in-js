import Engine from "./engine.js";

function Game() {
	this.before = 0;
	this.tickRate = 50; // Will set the update/refresh rate to run at 20 Hz. So 20 game logic updates per second (1s / 50 = 1000ms / 50 = 20).
	this.updateRate = 1000 / this.tickRate;
	this.lag = 0;

	this.gameLoop();
};

Game.prototype = {
	gameLoop: function() {

		var now = performance.now();
		var lastFrameDuration = now - this.before;
		
		this.lag += lastFrameDuration;

		while(this.lag >= this.updateRate) {
			Engine.update(); // Update game logic.
			this.lag -= this.updateRate;
		}

		Engine.render(); // Render as much as we can.

		this.before = now; // Make current time "before" to benchmark this in next frame.
		requestAnimationFrame(this.gameLoop.bind(this));
	}
}

export default Game;