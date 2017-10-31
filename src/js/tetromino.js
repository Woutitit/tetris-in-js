function Tetromino(canvas, canvasDimensions, letter, cellDimensions) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.cellWidth = cellDimensions[0]; // TODO maybe some central place to determine cell width and height so we only need to change it once.
	this.cellHeight = cellDimensions[1];

	this.shape = this.determineShape(letter.blocks);
	this.draw();
}


Tetromino.prototype = {
	determineShape: function(blocks) {
		blocks[0].forEach(function(block) {

		});

		blocks[1].forEach(function(block) {
	

		});
	},
	draw: function() {
		this.canvasCtx.fillStyle = "#8ab7ff";
		/*
		this.shape.forEach((coordinate) => {
			this.canvasCtx.fillRect(coordinate[0], coordinate[1], this.cellWidth, this.cellHeight);
		});
		*/
	}
}

export default Tetromino;