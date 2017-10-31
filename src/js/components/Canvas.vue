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

				grid: null
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

			// Spawn new tetromino on grid.
			// new Tetromino();

			// We have to update the grid everytime we make a succesful move/spawn somethinng or destroy a row.
			// this.grid.update();
		},
		methods: {
		}
	}
</script>