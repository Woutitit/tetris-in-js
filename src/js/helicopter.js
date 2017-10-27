function Helicopter(canvas, spriteSheet, spritePosX, spritePosY) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.spriteSheet = spriteSheet;
	this.spritePosX = spritePosX;
	this.spritePosY = spritePosY;

	this.dimensions = { WIDTH: 61, HEIGHT: 32 }

	this.init()
}

Helicopter.prototype = {
	/**
	 * Initialize Hero character.
	 */
	init: function() {
		this.draw(0, 100); // The y position should be height of canvas minus height of hero to place the hero completely at bottom of the canvas.
	},


	/**
	 * Draw helicopter.
	 */
	draw: function() {

		var helicopterCanvasX = 10;
		var helicopterCanvasY = 50;

		var helicopterSourceWidth = this.dimensions.WIDTH;
		var helicopterSourceHeight = this.dimensions.HEIGHT;

		this.canvasCtx.drawImage(
			this.spriteSheet, 
			this.spritePosX, 
			this.spritePosY, 
			helicopterSourceWidth, 
			helicopterSourceHeight, 
			helicopterCanvasX, 
			helicopterCanvasY, 
			this.dimensions.WIDTH, 
			this.dimensions.HEIGHT
		);
	},
}

export default Helicopter;