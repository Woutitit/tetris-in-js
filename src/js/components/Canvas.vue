<style>
canvas {
	/* TODO: Position canvas in middle of web page and make it responsive; */
}
</style>
<template>
	<canvas :id="id" :width="width" :height="height"></canvas>
</template>
<script>
	import Hero from "../hero.js";

	export default {
		name: "Canvas",

		props: ["id", "width", "height"],

		data: function() {
			return {
				canvas: null,
				canvasCtx: null,

				keycodes: {
					JUMP: ["38", "32"]
				},

				hero: null
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

			 	this.hero = new Hero(this.canvas);

			 	this.startListening();
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
			 * Catch and dispatch an event to this object.
			 * @param {Event} e
			 */
			 handleEvent: function(e) {
			 	switch(e.type) {
			 		case "keydown":
			 		this.onKeyDown(e);
			 		break;
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