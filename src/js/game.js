import Shapes from "./shapes.js";
import Grid from "./grid.js";
import Tetromino from "./tetromino.js";

function Game() {
	this.canvas = document.getElementById("tetris");
	this.canvasCtx = this.canvas.getContext("2d");

	this.colSpan = 10;
	this.rowSpan = 16;
	this.size = 20

	this.canvas.width = this.colSpan * this.size;
	this.canvas.height = this.rowSpan * this.size;

	this.cellSpan = this.canvas.width / this.colSpan;

	this.grid = null;
	this.currTetromino = null;

	this.init(); // Initialize game.
}

Game.prototype = {
	init: function() {
		this.grid = new Grid(this.canvasCtx, this.colSpan, this.rowSpan, this.cellSpan);

		this.startListening();

		this.update();
	},


	update: function() {
		if(!this.currTetromino || this.currTetromino.landed) {
			this.currTetromino = new Tetromino(Shapes.random(), this.grid);
		};

		this.currTetromino.drop();

		requestAnimationFrame(this.update.bind(this));
	},


	startListening: function() {
		document.addEventListener("keydown", this);
	},


	handleEvent: function(event) {
		switch(event.type) {
			case "keydown":
			this.onKeyDown(event.key);
			break;
		}
	},


	onKeyDown: function(key) {
		switch(key) {
			case "ArrowLeft":
			this.currTetromino.move("left");
			break;

			case "ArrowUp":
			this.currTetromino.rotate();
			break;

			case "ArrowRight":
			this.currTetromino.move("right");
			break;

			case "ArrowDown":
			this.currTetromino.move("down");
			break;
		}
	},

}

export default Game;
