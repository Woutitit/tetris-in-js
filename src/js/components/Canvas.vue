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
		props: ["id", "width", "height"],
		data: function() {
			return {
				canvas: null
			}
		},
		methods: {
			/**
			 * Initialize game canvas
			 */
			init: function() {
				this.canvas = document.getElementById(this.id);
			}
		}
	}
</script>

