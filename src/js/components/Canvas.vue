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
	export default {
		props: ["id", "width", "height"],
		data: function() {
			return {
				canvas: null,

				WIDTH: this.width,
				HEIGHT: this.height,

				LETTERS: ["I", "O", "T", "S", "Z", "J", "L"]
			}
		},
		mounted: function() {
			this.canvas = document.getElementById(this.id);

			this.spawnTetromino();
		},
		methods: {
			spawnTetromino: function() {
				new Tetromino(this.randomLetter());
			},
			randomLetter() {
				return this.LETTERS[Math.floor(Math.random() * this.LETTERS.length)];
			}
		}
	}
</script>