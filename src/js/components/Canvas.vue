<style>

canvas {
	border: 1px solid #000;
}
</style>
<template>
	<canvas :id="id" :width="width" :height="height"></canvas>
</template>
<script>
	export default {
		name: "Canvas",

		props: ["id", "width", "height"],

		data: function() {
			return {
				canvas: null,
				canvasCtx: null
			}
		},

		methods: {
			/**
			 * Initialize game canvas.
			 */
			init: function() {
				this.canvas = document.getElementById(this.id);
				this.canvasCtx = this.canvas.getContext("2d");

				this.startListening();

				new Hero(); // Dependency injection to draw initial position of hero.
			},

			/**
			 * Bind key / mouse events.
			 */
			 startListening: function() {
			 	document.addEventListener("keyup", this);
			 	document.addEventListener("keydown", this);
			 }
		}
	}
</script>

