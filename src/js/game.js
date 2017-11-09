import Grid from "./grid.js";
import Tetromino from "./tetromino.js";

function Game(canvas, columns, rows, size) {
	this.canvas = canvas;
	this.canvasCtx = canvas.getContext("2d");

	this.canvasWidth = canvas.width;
	this.canvasHeight = canvas.height;

	this.colSpan = columns;
	this.rowSpan = rows;
	this.celSpan = this.canvasWidth / columns;

	this.init(); // Initialize game.
}

Game.prototype = {
	init: function() {
		new Grid(this.canvasCtx, this.colSpan, this.rowSpan, this.cellSpan);
	}
}

export default Game;
