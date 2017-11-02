<style>
canvas {
	/* TODO: Position canvas in middle of web page and make it responsive; */
	border: 1px solid #000; 
	display: block;
	margin: auto;
}
</style>
<template>
	<canvas :id="id" :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"></canvas>
</template>
<script>
	import Grid from "../grid.js";
	import Tetromino from "../tetromino.js";

	export default {
		props: ["id", "size"],
		data: function() {
			return {
				canvas: null,
				canvasCtx: null,

				COLS: 10,
				ROWS: 16,

				CELL_WIDTH: 0,
				CELL_HEIGHT: 0,

				CANVAS_WIDTH: 0,
				CANVAS_HEIGHT: 0,

				grid: null,
				currTetromino: null,

				interval: 0
			}
		},
		created() {
			// Note: we need to use "created()" to be able t assign values to width and height. Otherwise canvas doesn't pick them up.
			this.CELL_DIMENSION = this.COLS * this.size; // Cell dimensions are equal to column amount times size.

			this.CANVAS_WIDTH = this.CELL_DIMENSION * this.COLS;
			this.CANVAS_HEIGHT = this.CELL_DIMENSION * this.ROWS;

		},
		mounted: function() {
			this.canvas = document.getElementById(this.id);
			this.canvasCtx = this.canvas.getContext("2d");

			this.grid = new Grid(this.COLS, this.ROWS, this.canvas, this.CELL_DIMENSION);


			// We have to update the grid everytime we make a succesful move/spawn something or destroy a row.
			// this.grid.update();
			this.startListening();

			// Now what we have to do is move down the tetromino with a set Interval.
			this.update();

			// Anyway we can just run requestAnimationFrame the whole time and it will on its own pick up the things to draw.
		},
		methods: {
			update: function() {
				this.grid.update(); // Continously redraw the grid and fill all 0's with 1's based on the coordinates.
				console.log(this.grid.playingField);

				// If no tetromino is dropping at the moment.
				if(!this.currTetromino || this.currTetromino.landed) {
					// Spawn new tetromino on grid.
					this.currTetromino = new Tetromino(this.grid);
				}

				this.currTetromino.drop(); // Make tetromino continously drop.

				requestAnimationFrame(this.update);
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
			}
		}
	}
</script>