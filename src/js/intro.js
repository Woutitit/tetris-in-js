function Intro(canvas, canvasDimensions, spriteSheet, spritePos) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");
	this.canvasDimensions = canvasDimensions;
	
	this.spriteSheet = spriteSheet;
	this.spritePos = spritePos;
	
	this.dimensions = {
		START_BUTTON: { WIDTH: 32, HEIGHT: 32 }
	};

	this.draw(); // Immediately draw, no init needed.
}

Intro.prototype = {
	/**
	 * Draw intro screen.
	 */
	 draw: function() {
	  
		// TODO: Add message "Press to start" in like Courier font.
		// TODO: Make this a panel with button + text?

		this.drawStartButton();
		
	},


	drawStartButton: function() {
		var startButtonSourceWidth = this.dimensions.START_BUTTON.WIDTH;
	 	var startButtonSourceHeight = this.dimensions.START_BUTTON.HEIGHT;

	 	// Position start button in the middle.
	 	// TODO: Add general method for center positioning?
		var startButtonX = this.canvasDimensions.WIDTH / 2 - this.dimensions.START_BUTTON.WIDTH / 2;
		var startButtonY = this.canvasDimensions.HEIGHT / 2 - this.dimensions.START_BUTTON.HEIGHT / 2;

		this.canvasCtx.drawImage(
			this.spriteSheet, 
			this.spritePos.START_BUTTON.x, 
			this.spritePos.START_BUTTON.y, 
			startButtonSourceWidth, 
			startButtonSourceHeight, 
			startButtonX, 
			startButtonY, 
			this.dimensions.START_BUTTON.WIDTH, 
			this.dimensions.START_BUTTON.HEIGHT
			);
	}
}

export default Intro;