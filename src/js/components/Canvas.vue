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
	import Game from "../game.js";

	export default {
		props: ["id", "columns", "rows", "size"],
		data: function() {
			return {
				canvas: null,

				CANVAS_WIDTH: 0,
				CANVAS_HEIGHT: 0,
			}
		},
		created: function() {
			this.CANVAS_WIDTH = this.columns * this.size;
			this.CANVAS_HEIGHT = this.rows * this.size;
		},
		mounted: function() {
			
			var canvas = document.getElementById(this.id);

			// Start new game.
			// TODO: Start game on button click instead of directly.
			new Game(canvas, parseInt(this.columns), parseInt(this.rows), parseInt(this.size));
		},
		// Some methods that will be called from the J files through the "parent argument" to be able to update reactive components.
		methods: {
			updateScore: function(score) {
				this.$root.$emit("updateScore", score);
			}
		}
	}

</script>