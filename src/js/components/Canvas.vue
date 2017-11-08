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
		props: ["id", "size"],
		data: function() {
			return {
				canvas: null,

				CANVAS_WIDTH: 0,
				CANVAS_HEIGHT: 0,
			}
		},
		mounted: function() {
			// TODO: Start game on button click.
			// TODO: Maybe we can GET the width and height of this canvas element so we only need to supply the canvas?
			new Game(canvas);
		}
	}

</script>