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

	/**
	* If used in conjunction with requestAnimationFrame() it will update position of helicopter.
	*/
	update: function() {
		this.draw(this.helicopterCanvasX, this.helicopterCanvasY);
	},


	/**
	* Move helicopter in certain direction.
	* @param {String} direction
	*/
	move: function(direction) {
		switch(direction) {
			case "left":
			this.helicopterCanvasX -= 5;
			break;
			case "up":
			this.helicopterCanvasY -= 5;
			break;
			case "right":
			this.helicopterCanvasX += 5;
			break;
			case "down":
			this.helicopterCanvasY += 5;
			break;
		}
	}
}

export default Helicopter;