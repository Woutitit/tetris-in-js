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

	export default {
		props: ["id", "width", "height"],
		data: function() {
			return {
				canvas: null,

				WIDTH: this.width,
				HEIGHT: this.height,
			}
		},
		mounted: function() {
			this.canvas = document.getElementById(this.id);

			var grid = new Grid(this.canvas, this.WIDTH, this.HEIGHT);
		}
	}
</script>