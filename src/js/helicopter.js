function Helicopter(canvas, spriteSheet, spritePosX, spritePosY) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.spriteSheet = spriteSheet;
	this.spritePosX = spritePosX;
	this.spritePosY = spritePosY;

	this.dimensions = { WIDTH: 61, HEIGHT: 32 }

	this.helicopterCanvasX = 10;
	this.helicopterCanvasY = 50;
}

Helicopter.prototype = {
	/**
	* Draw helicopter.
	*/
	draw: function(canvasX, canvasY) {

		var helicopterSourceWidth = this.dimensions.WIDTH;
		var helicopterSourceHeight = this.dimensions.HEIGHT;

		this.canvasCtx.drawImage(
			this.spriteSheet, 
			this.spritePosX, 
			this.spritePosY, 
			helicopterSourceWidth, 
			helicopterSourceHeight, 
			canvasX, 
			canvasY, 
			this.dimensions.WIDTH, 
			this.dimensions.HEIGHT
			);
	},


	update: function() {
		this.draw(this.helicopterCanvasX, this.helicopterCanvasY);
	},


	left: function() {
		this.helicopterCanvasX -= 5;
	},

	up: function() {
		this.helicopterCanvasY -= 5;
	},


	right: function() {
		this.helicopterCanvasX += 5;
	},


	down: function() {
		this.helicopterCanvasY += 5;
	},
}

export default Helicopter;