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
					START_BUTTON: { x: 0, y: 0 },
					HELICOPTER: { x: 32, y: 0 }
				},

				canvas: null,
				canvasCtx: null,
				dimensions: null,
				boundaries: null,

				keyCodes: {
					LEFT: 37,
					UP: 38,
					RIGHT: 39,
					DOWN: 40
				},

				helicopter: null,

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

				this.dimensions = { WIDTH: this.width, HEIGHT: this.height };
				this.boundaries = { LEFT: 0, TOP: 0, RIGHT: this.dimensions.HEIGHT, DOWN: this.dimensions.width };


				this.helicopter = new Helicopter(this.canvas, this.boundaries, this.spriteSheet, this.spritePos.HELICOPTER.x, this.spritePos.HELICOPTER.y);

				this.startListening();
				// Already run update function even before the game starts so that we could already show
				// our hero blink or something. This update function is just here to make the canvas look like a 60FPS game.
				this.update();
			},


			/**
			* Main loop. Continously gets called by requestAnimationFrame meaning it's also "watching" all global vars used in this method.
			*/
			update: function() {
				// Also the 60 FPS thing from google I think is only important for sprite animations such as walking (?).
				// WE CAN'T CREATE NEW OBJECTS IN UPDATE METHOD CUZ IT WILL ALWAYS LOSE PROPERTIES DATA IMMEDIATLY. DO IT IN INIT(?).
				// Only objects we can create in here are objects we won't modify the data of later.
				this.clearCanvas(); // Always clear canvas per frame to not draw any doubles.

				this.drawBackground();

				if(this.playingIntro) {
					new Intro(this.canvas, this.dimensions, this.spriteSheet, this.spritePos);
					// Will this create multiple intro's or only always 1 new intro?
				}

				if(this.isPlaying) {
					this.helicopter.update();
				}

				requestAnimationFrame(this.update); // Will continously run the "update" method.
			},


			/**
			* Starts gameplay.
			*/
			start: function() {
				this.isPlaying = true;
				this.playingIntro = false;

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
				switch(e.keyCode) {
					case this.keyCodes.LEFT:
					this.helicopter.move("left");
					break;
					case this.keyCodes.UP:
					this.helicopter.move("up");
					break;
					case this.keyCodes.RIGHT:
					this.helicopter.move("right");
					break;
					case this.keyCodes.DOWN:
					this.helicopter.move("down");
					break;
				}
			},


			/**
			* Handle mousedown events.
			* @param {Event} e
			*/
			onMouseDown: function(e) {
				// Will get mouseclick position with respect to canvas.
				// Useful to check whether certain canvas objects have been clicked.
				var mouseX = parseInt(e.clientX) - this.canvas.getBoundingClientRect().left;
				var mouseY = parseInt(e.clientY) - this.canvas.getBoundingClientRect().top;
				
				if(e.target == this.canvas) {
					if(!this.isPlaying) {
						this.start();
					}	
				}
			}
		}
	}
</script>