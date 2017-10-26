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
				canvasCtx: null,
				keycodes: {
					JUMP: ["38", "32"]
				}
			}
		},

		mounted: function() {
			this.init();
		},
		
		methods: {
			/**
			 * Initialize game canvas.
			 */
			init: function() {
				this.canvas = document.getElementById(this.id);
				this.canvasCtx = this.canvas.getContext("2d");

				this.startListening();

				this.hero = new Hero(); // Dependency injection to draw initial position of hero.
			},


			/**
			 * Bind revelant mouse / key events.
			 */
			startListening: function() {
				document.addEventListener("keydown", this);
			},


			/**
			 * Unbind revelant mouse / key events.
			 */
			stopListening: function() {

			},


			/**
			 * Catch all events dispatched to this object.
			 * @param {Event} e
			 */
			handleEvent: function(e) {
				switch (e.type) {
                    case "keydown":
                    	this.onKeyDown(e);
                }
			},


			/**
			 * Handle keydown events.
			 * @param {Event} e
			 */
			onKeyDown: function(e) {
				if(this.keycodes[e.keyCode]) {
					this.hero.jump();
				}
			}
		}
	}
</script>

