<style>
canvas {
	/* TODO: Position canvas in middle of web page and make it responsive; */
	border: 1px solid #000; 
	display: block;
	margin: auto;
}
</style>
<template>
	<canvas :id="id" :width="width" :height="height"></canvas>
</template>
<script>
	import Grid from "../grid.js";
	import Tetromino from "../tetromino.js";

	export default {
		props: ["id", "width", "height"],
		data: function() {
			return {
				canvas: null,
				canvasCtx: null,

				dimensions: { 
					WIDTH: this.width,
					HEIGHT: this.height
				},

				// Determines how big one cell of the grid (20 x 10) is.
				cellDimensions: { 
					WIDTH: this.width / 10,
					HEIGHT: this.height / 20,
				},

				LETTERS: {
					I: { 
						blocks: [ 
						[0, 0, 0, 0],
						[1, 1, 1, 1]
						], 
						color: "red"
					},
					O: {
						blocks: [
						[1, 1],
						[1, 1]
						], 
						color: "red"
					},
					T: { 
						blocks: [
						[0, 1, 0], 
						[1, 1, 1]
						], 
						color: "red" 
					},
					S: { 
						blocks: [
						[0, 1, 1], 
						[1, 1, 0]
						],
						color: "red"
					},
					Z: {
						blocks: [
						[1, 1, 0],
						[0, 1, 1]
						], 
						color: "red"
					},
					J: {
						blocks: [
						[1, 0, 0], 
						[1, 1, 1]
						], 
						color: "red"
					},
					L: { 
						blocks: [
						[0, 0, 1], 
						[1, 1, 1]
						], 
						color: "red"
					}
				}
			}
		},
		mounted: function() {
			this.canvas = document.getElementById(this.id);
			this.canvasCtx = this.canvas.getContext("2d");

			this.canvasCtx.fillStyle = "#F8F8F8";
			this.canvasCtx.fillRect(0, 0, this.dimensions.WIDTH, this.dimensions.HEIGHT);

			this.spawnTetromino();

			// Always draw grid after tetrominoes so it looks like it's covering the tetrominoes
			// Or just make tetrominoes overlap grid?
			new Grid(this.canvas, this.dimensions, this.cellDimensions);

			document.addEventListener("keydown", function() {
				console.log("lol");

			});
		},
		methods: {
			spawnTetromino: function() {
				new Tetromino(this.canvas, this.dimensions, this.LETTERS.I, this.cellDimensions);
			},
			randomLetter() {
				return this.LETTERS[Math.floor(Math.random() * this.LETTERS.length)];
			}
		}
	}
</script>