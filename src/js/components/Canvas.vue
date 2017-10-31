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
			}
		},
		mounted: function() {
			this.canvas = document.getElementById(this.id);
			this.canvasCtx = this.canvas.getContext("2d");

			this.grid = new Grid(16, 10);

			// Spawn new tetromino on grid.
			// new Tetromino();

			// We have to update the grid everytime we make a succesful move/spawn somethinng or destroy a row.
			// this.grid.update();
		},
		methods: {
		}
	}
</script>