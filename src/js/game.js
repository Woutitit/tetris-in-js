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

	this.grid = null;
	this.currTetromino = null;

	this.init(); // Initialize game.
}

Game.prototype = {
	init: function() {
		this.grid = new Grid(this.canvasCtx, this.colSpan, this.rowSpan, this.cellSpan);

		this.update();
	},


	update: function() {
		if(!this.currTetromino || this.currTetromino.landed) {
			this.currTetromino = new Tetromino(Shapes.random(), this.grid);
		};

		this.currTetromino.drop();

		requestAnimationFrame(this.update.bind(this));
	}
}

export default Game;
