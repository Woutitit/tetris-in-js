function Grid(canvas, canvasDimensions) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.canvasWidth = canvasDimensions[0];
	this.canvasHeight = canvasDimensions[1];

	this.GRID_COLOR = "#EEE";

	this.cellWidth = this.canvasWidth / 10; // 10 cells horizontal.
	this.cellHeight = this.canvasHeight / 20; // 20 cells vertical.

	this.line_horizont

	this.draw();

}

Grid.prototype = {
	draw: function() {
		this.canvasCtx.strokeStyle = this.GRID_COLOR;
		this.drawHorizontalLines();
		this.drawVerticalLines()
	},
	drawHorizontalLines: function() {
		for(var x = this.cellWidth; x < this.canvasWidth; x += this.cellWidth) {
			this.canvasCtx.moveTo(x, 0);
			this.canvasCtx.lineTo(x, this.canvasHeight);
			this.canvasCtx.stroke();
		}
	},
	drawVerticalLines: function() {
		for(var y = this.cellHeight; y < this.canvasHeight; y += this.cellHeight) {
			this.canvasCtx.moveTo(0, y);
			this.canvasCtx.lineTo(this.canvasWidth, y);
			this.canvasCtx.stroke();
		}
	}
}

export default Grid;