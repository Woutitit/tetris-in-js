import Shapes from "./shapes.js";
import Grid from "./grid.js";
import Tetromino from "./tetromino.js";

function Game(canvas, columns, rows, size) {
	this.canvas = canvas;
	this.canvasCtx = canvas.getContext("2d");

	this.canvasWidth = canvas.width;
	this.canvasHeight = canvas.height;

	this.colSpan = columns;
	this.rowSpan = rows;
	this.cellSpan = this.canvasWidth / columns;

	this.init(); // Initialize game.
}

Game.prototype = {
	init: function() {
		var grid = new Grid(this.canvasCtx, this.colSpan, this.rowSpan, this.cellSpan);

		var randomShape = Shapes.random();
		var nextTetromino = new Tetromino(randomShape);
		
		// If no current tetromino...
		var currTetromino = nextTetromino;
		currTetromino.spawn(grid);
	}
}

export default Game;
