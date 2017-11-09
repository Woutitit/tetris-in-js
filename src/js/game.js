import Grid from "./grid.js";
import Tetromino from "./tetromino.js";

function Game(canvas, columns, rows, size, parent) {
	
	this.canvas = canvas;
	this.canvasCtx = canvas.getContext("2d");
	this.parent = parent;

	this.COLS = columns;
	this.ROWS = rows;

	this.CANVAS_WIDTH = columns * size;
	this.CANVAS_HEIGHT = rows * size;

	/**
	* THE LETTER COLOR CODES:
	* 1 = light blue
	* 2 = dark blue
	* 3 = orange
	* 4 = yellow
	* 5 = green
	* 6 = purple
	* 7 = red
	*/
	this.SPAWN_SHAPES = {
		I: [ 
		[0, 0, 0, 0], 
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		],
		J: [
		[2, 0, 0], 
		[2, 2, 2],
		[0, 0, 0],
		],
		L: [
		[0, 0, 3], 
		[3, 3, 3],
		[0, 0, 0],
		], 
		O: [ 
		[0, 0, 0, 0], 
		[0, 4, 4, 0],
		[0, 4, 4, 0],
		[0, 0, 0, 0],
		],
		S: [ 
		[0, 5, 5], 
		[5, 5, 0],
		[0, 0, 0],
		],
		T: [ 
		[0, 6, 0],
		[6, 6, 6],
		[0, 0, 0] 
		],
		Z: [ 
		[7, 7, 0], 
		[0, 7, 7],
		[0, 0, 0]
		],
	};

	this.grid = null;
	this.currTetromino = null;

	// Initialize game.
	this.init();
}

Game.prototype = {
	init: function() {

		this.grid = new Grid(this.COLS, this.ROWS, this.canvas, this.CANVAS_WIDTH, this.parent);

		// We have to update the grid everytime we make a succesful move/spawn something or destroy a row.
		this.startListening();

		// Now what we have to do is move down the tetromino with a set Interval.
		this.update();
	},


	update: function() {
			// console.log(this.grid.playingField);

			// If no tetromino is dropping at the moment.
			if(!this.currTetromino  || this.currTetromino.landed) {
				// Spawn new tetromino on grid.
				// TODO: BEFORE SPAWNING CHECK IF THESE COORDINATES ARE NOT OCCUPIED
				// IF THEY ARE IT IS GAME OVER.
				// SO WE DO THIS BY RANDOMING OUR TETROMINO WITH NEW AND IF
				// FREE COORDINATES THEN EXECUTE THE SPAWN METHOD.
				// SO SPAWN WILL REPLACE INIT.
				this.currTetromino = new Tetromino(this.grid, this.randomLetter(), this.parent);
			}

			this.currTetromino.drop(); // Make tetromino continously drop.

			requestAnimationFrame(this.update.bind(this));
		},


		startListening: function() {
			document.addEventListener("keydown", this);
		},


		/*
		* Handle all events we're listening to in "startListening()".
		* @param {Event} event
		*/
		handleEvent: function(event) {
			switch(event.type) {
				case "keydown":
				this.onKeyDown(event.key);
				break;
			}
		},


		/*
		* Handle keydown keyboard events.
		* Note: we do not need smooth movement since we want a keypress to only trigger one move event each it has been pressed.
		* @param {String} key - The keyboard key that has been pressed
		*/
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

		randomLetter: function() {
			// TODO: Make randomize that is less random. For example, favor tetromino shapes that have not spawned as much as others.
			var keys = Object.keys(this.SPAWN_SHAPES);
			
			return this.SPAWN_SHAPES[keys[Math.floor(Math.random() * keys.length)]];
		}
	}

export default Game;
