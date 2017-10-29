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
	import KeyBoardEvtPolyfill from "keyboardevent-key-polyfill";

	require('keyboardevent-key-polyfill').polyfill();

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

				keyBindings: {
					MOVE_LEFT: "ArrowLeft",
					MOVE_UP: "ArrowUp",
					MOVE_RIGHT: "ArrowRight",
					MOVE_DOWN: "ArrowDown",
					SHOOT: " " // This blank means the spacebar
				},

				keysPressed: [], // Temporarily holds all keys pressed.

				helicopter: null,

				playingIntro: true,
				isPlaying: false,
				isPaused: false,
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
				this.update();
			},


			/**
			* Main loop. Continously gets called by requestAnimationFrame meaning it's also "watching" all global vars used in this method.
			*/
			update: function() {
				this.clearCanvas(); // Always clear canvas per frame to not draw any doubles.
				this.drawBackground(); // Canvas background color.

				// When game is in intro.
				if(this.playingIntro) {
					new Intro(this.canvas, this.dimensions, this.spriteSheet, this.spritePos);
				}

				// When game is going on.
				if(this.isPlaying) {
					this.helicopter.enableControls(this.keysPressed, this.keyBindings);
					this.helicopter.update();

					// NOW SPAWN ENEMIES

					// SPAWN POWER UPS
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
				document.addEventListener("keyup", this);
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
					case "keyup":
					this.onKeyUp(e.key)
					break;
					case "keydown":
					this.onKeyDown(e.key)
					break;
					case "mousedown":
					this.onMouseDown(e);
					break;
				}
			},


			/**
			* Handle keydown events.
			* @param {String} key - Registered key from event.
			*/
			onKeyDown: function(key) {
				// TODO: Polyfill the event.key
				// Source: https://github.com/cvan/keyboardevent-key-polyfill
				this.keysPressed.push(key);
			},


			onKeyUp: function(key) {
				// Remove the key that triggered this event from keysPressed array.
				this.keysPressed = this.keysPressed.filter(val => val !== key);
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