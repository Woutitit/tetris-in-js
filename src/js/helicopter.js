function Hero(canvas) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.xPos = 0;
	this.yPos = 0;

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
		this.xPos = x;
		this.yPos = y;

		this.canvasCtx.fillRect(this.xPos, this.yPos, 50, 50);
	},
}

export default Hero;