function Tetromino(canvas, canvasDimensions, letter) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.cellWidth = 25;
	this.cellHeight = 25;

	this.shape = this.determineShape(letter);
	this.draw();
}


Tetromino.prototype = {
	determineShape: function(letter) {
		switch(letter) {
		case "I":
		return [[25, 0], [0, 25], [25, 25], [ 50, 25]];
		break; 
		
		case "O":
		return [[25, 0], [0, 25], [25, 25], [ 50, 25]];
		break; 
		
		case "T":
		return [[25, 0], [0, 25], [25, 25], [ 50, 25]];
		break; 
		
		case "S":
		return [[25, 0], [0, 25], [25, 25], [ 50, 25]];
		break; 
		
		case "Z":
		return [[25, 0], [0, 25], [25, 25], [ 50, 25]];
		break; 
		
		case "J":
		return [[25, 0], [0, 25], [25, 25], [ 50, 25]];
		break;

		case "L":
		return [[25, 0], [0, 25], [25, 25], [ 50, 25]];
		break;
	}


	},
	draw: function() {
		this.canvasCtx.fillStyle = "#8ab7ff";
		this.shape.forEach((coordinate) => {
			this.canvasCtx.fillRect(coordinate[0], coordinate[1], this.cellWidth, this.cellHeight);
		});
	}
}

export default Tetromino;