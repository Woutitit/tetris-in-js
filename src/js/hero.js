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
		this.draw(0, 300); // The y position should be height of canvas minus height of hero to place the hero completely at bottom of the canvas.
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
		this.canvasCtx.fillRect(10, 10, 50, 50);

	}
}

export default Hero;