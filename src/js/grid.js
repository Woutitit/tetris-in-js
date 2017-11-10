function Grid(canvasCtx, colSpan, rowSpan, cellSpan) {
	this.defaultConfig = {
		SPAWN_TOP_LEFT: { x: 3, y: 0 } // Top left spawn coordinates on the grid for tetrominoes.
	};

	this.canvasCtx = canvasCtx;
	
	this.cellSpan = cellSpan;

	this.currTopLeft = this.defaultConfig.SPAWN_TOP_LEFT; // Current tetromino top left coordinates.

	this.init(rowSpan, colSpan);
}

Grid.prototype = {
	init: function(rowSpan, colSpan) {
		var gridData = Array(rowSpan).fill().map(() => Array(colSpan).fill(0));
	},


	resetTopLeft: function() {
		this.currTopLeft = this.defaultConfig.SPAWN_TOP_LEFT;
	},


	drawShape: function(shape) {
		var currentY = this.currTopLeft.y;

		shape.forEach((row) => {

			var currentX =  this.currTopLeft.x;

			row.forEach((colorValue) => {
				if(colorValue !== 0) {
					this.draw(currentX, currentY, colorValue);
				}
				currentX++; // Make next x coordinate current x to insert into grid if necessary.
			})
			currentY++; // Make next row current Y coordinate
		});
	},


	draw: function(x, y, colorValue) {
		this.canvasCtx.fillStyle = "#000";
		this.canvasCtx.fillRect(x * this.cellSpan, y * this.cellSpan, this.cellSpan, this.cellSpan);
	}
}

export default Grid;