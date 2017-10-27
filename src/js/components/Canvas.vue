<style>
canvas {
	/* TODO: Position canvas in middle of web page and make it responsive; */
	/* border: 1px solid #000; */
	display: block;
	margin: auto;
}
</style>
<template>
	<canvas :id="id" :width="width" :height="height"></canvas>
</template>
<script>
	import Intro from "../intro.js";
	import Helicopter from "../helicopter.js";

	export default {
		name: "Canvas",

		props: ["id", "width", "height"],

		data: function() {
			return {
				spriteSheet: null,
				spritePos: {
					START_BUTTON: { x: 0, y: 0 }
				},

				canvas: null,
				canvasCtx: null,
				dimensions: null,

				keyCodes: {
					JUMP: { "38": 1, "32": 1}
				},

				hero: null,

				playingIntro: true,
				isPlaying: false,
				isPaused: false
			}
		},


		mounted: function() {
			this.loadSpriteSheet().then(() => {
				this.init();
			});
		},

		
		methods: {
			loadSpriteSheet: function() {
				return new Promise((resolve,reject) => {
					this.spriteSheet = new Image();
					this.spriteSheet.src = "src/assets/spritesheet.png";

					this.spriteSheet.onload = function() {
						resolve(this.spriteSheet); 
					}

					this.spriteSheet.onerror = function(error) {
						reject(error);
					}
				});
			},


			/**
			* Initialize game canvas.
			*/
			init: function() {
				this.canvas = document.getElementById(this.id);
				this.canvasCtx = this.canvas.getContext("2d");
				this.dimensions = { WIDTH: this.width, HEIGHT: this.height }


				//this.hero = new Hero(this.canvas);

				this.startListening();
				// Already run update function even before the game starts so that we could already show
				// our hero blink or something. This update function is just here to make the canvas look like a 60FPS game.
				this.update();
			},


			/**
			* Starts gameplay.
			*/
			start: function() {
				this.isPlaying = true;
				this.playingIntro = false;

			},


			/**
			* Main loop. Continously gets called by requestAnimationFrame meaning it's also "watching" all global vars used in this method.
			*/
			update: function() {
				// Also the 60 FPS thing from google I think is only important for sprite animations such as walking (?).
				this.clearCanvas(); // Always clear canvas per frame to not draw any doubles.

				this.drawBackground();

				if(this.playingIntro) {
					new Intro(this.canvas, this.dimensions, this.spriteSheet, this.spritePos);
				}

				if(this.isPlaying) {
					var helicopter = new Helicopter();
				}

				requestAnimationFrame(this.update); // Will continously run the "update" method.
			},


			clearCanvas: function() {
				this.canvasCtx.clearRect(0, 0, this.width, this.height);
			},


			drawBackground: function() {
				this.canvasCtx.fillStyle = "#EEE";
				this.canvasCtx.fillRect(0, 0, this.dimensions.WIDTH, this.dimensions.HEIGHT);

			},


			/**
			* Bind revelant mouse / key events.
			*/
			startListening: function() {
				document.addEventListener("keydown", this);
				document.addEventListener("mousedown", this);
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
					case "mousedown":
					this.onMouseDown(e);
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

				//TODO: Make "Enter", "Space" en "Up" also start game if game status is not playing.
			},


			/**
			* Handle mousedown events.
			* @param {Event} e
			*/
			onMouseDown: function(e) {
				// Will get mouseclick position with respect to canvas and then check what to activate based on that.
				var mouseX = parseInt(e.clientX) - this.canvas.getBoundingClientRect().left;
				var mouseY = parseInt(e.clientY) - this.canvas.getBoundingClientRect().top;

				if(!this.isPlaying) {
					// This means that we are on the start screen so we should
					// We should check if mouseclick event was on area of button.
					// Or we should not check and just automatically let the game play no matter where it is clicked.
					// Only thing we have to check is whether they have clicked on the canvas element but we can see that with e and then the id.
					this.start();
				}
			}
		}
	}
</script>