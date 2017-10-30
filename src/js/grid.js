import Cell from "./cell.js";

function Grid(canvas, canvasWidth, canvasHeight) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;

	this.cellWidth = canvasWidth / 10; 
	this.cellHeight = canvasHeight / 20;

	this.draw();

}

Grid.prototype = {
	init: function() {
		new Cell(this.cellWidth, this.cellHeight);
	},
	draw: function() {
		this.canvasCtx.fillRect(10, 10, 10, 10);
	}
}

export default Grid;