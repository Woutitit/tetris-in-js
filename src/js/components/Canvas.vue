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

				keyCodes: {
					JUMP: {"38": 1, "32": 1}
				},

				hero: null,
			}
		},


		mounted: function() {
			this.loadImages().then(
				() => {
					console.log("LOL");
					this.init();
				});
		},

		
		methods: {
			loadImages: function() {
				return new Promise(function(resolve,reject) {
					var imageSprite = new Image();
					imageSprite.src = "src/assets/spritesheet.png";

					imageSprite.onload = function() {
						resolve(imageSprite); 
					}

					imageSprite.onerror = function(error) {
						reject(error);
					}
				})
			},


			/**
			* Initialize game canvas.
			*/
			init: function() {
				this.canvas = document.getElementById(this.id);
				this.canvasCtx = this.canvas.getContext("2d");

				this.hero = new Hero(this.canvas);

				this.startListening();
				this.update();
			},


			update: function() {
				this.clearCanvas();

				this.hero.draw(this.hero.xPos, this.hero.yPos);

				requestAnimationFrame(this.update); // Will continously run the "update" method.
			},


			clearCanvas: function() {
				this.canvasCtx.clearRect(0, 0, this.width, this.height);
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
				if(this.keyCodes.JUMP[e.keyCode]) {
					this.hero.jump();
				}
			}
		}
	}
</script>