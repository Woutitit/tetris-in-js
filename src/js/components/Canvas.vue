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

				WIDTH: this.width,
				HEIGHT: this.height,

				LETTERS: ["I", "O", "T", "S", "Z", "J", "L"]
			}
		},
		mounted: function() {
			this.canvas = document.getElementById(this.id);
			this.canvasCtx = this.canvas.getContext("2d");

			this.canvasCtx.fillStyle = "#F8F8F8";
			this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

			this.spawnTetromino();

			// Always draw grid after tetrominoes so it looks like it's covering the tetrominoes
			// Or just make tetrominoes overlap grid?
			new Grid(this.canvas, [this.WIDTH, this.HEIGHT]);
		},
		methods: {
			spawnTetromino: function() {
				new Tetromino(this.canvas, [this.WIDTH, this.HEIGHT], this.randomLetter());
			},
			randomLetter() {
				return this.LETTERS[Math.floor(Math.random() * this.LETTERS.length)];
			}
		}
	}
</script>