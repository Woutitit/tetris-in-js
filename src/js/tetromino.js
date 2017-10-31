function Tetromino(canvas, canvasDimensions, letter, cellDimensions) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.cellWidth = cellDimensions.WIDTH; // TODO maybe some central place to determine cell width and height so we only need to change it once.
	this.cellHeight = cellDimensions.HEIGHT;

	// x = 4, y = 1 is starting position for every tetromino.

	this.drawFirstRow(letter.blocks[0]);
	this.drawSecondRow(letter.blocks[1]);
}


Tetromino.prototype = {
	draw: function(drawPos) {
		this.canvasCtx.fillStyle = "#000";
		this.canvasCtx.fillRect(drawPos.x, drawPos.y, this.cellWidth, this.cellHeight);	
	},
	drawFirstRow: function(blocks) {
		var x = 4;
		var y = 1; // Should be -2 later to make it spawn right above the canvas to then drop in.
		blocks.forEach((block) => {
			if(block === 1) {
				this.draw(this.getGridPos(x, y));
			}
			x += 1;
		});
	},
	drawSecondRow: function(blocks) {
		var x = 4;
		var y = 2; // Should be -1.
		blocks.forEach((block) => {
			if(block === 1) {
				this.draw(this.getGridPos(x, y));
			}
			x += 1;
		});
	},
	getGridPos: function(x, y) {
		return {
			x: this.cellWidth * (x - 1), 
			y: this.cellHeight * (y - 1)
		};
	}
}

export default Tetromino;