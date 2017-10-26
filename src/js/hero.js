function Hero(canvas) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.init()
}

Hero.prototype = {
	/**
	 * Initialize Hero character.
	 */
	init: function() {
		this.draw(0, 300);
	},


	/**
	 * Draw hero.
	 */
	draw: function(x, y) {
		this.canvasCtx.fillRect(x, y, 50, 50);
	},


	/**
	 * Let hero jump.
	 */
	jump: function() {

	}
}

export default Hero;