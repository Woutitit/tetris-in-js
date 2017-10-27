<style>
canvas {
	/* TODO: Position canvas in middle of web page and make it responsive; */
	border: 1px solid #000;
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
				imageSprite: null,
				spritePos: {
					START_BUTTON: { x: 0, y: 0 }
				},

				canvas: null,
				canvasCtx: null,

				keyCodes: {
					JUMP: { "38": 1, "32": 1}
				},

				hero: null,

				isPlaying: false,
				isPaused: false
			}
		},


		mounted: function() {
			this.loadImageSprite().then(() => {
				this.init();
			});
		},

		
		methods: {
			loadImageSprite: function() {
				return new Promise((resolve,reject) => {
					this.imageSprite = new Image();
					this.imageSprite.src = "src/assets/spritesheet.png";

					this.imageSprite.onload = function() {
						resolve(this.imageSprite); 
					}

					this.imageSprite.onerror = function(error) {
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

				// So you have a SOURCE width, however with the third and fourth argument you can scale this source width if necessary.
				// You could do this for bigger where obviously the width always stays the same but you want to scale the image up.
				
				var startButtonDimensions = {
					START_BUTTON_WIDTH: 32,
					START_BUTTON_HEIGHT: 32
				}

				var startButtonSourceWidth = startButtonDimensions.START_BUTTON_WIDTH;
				var startButtonSourceHeight = startButtonDimensions.START_BUTTON_HEIGHT;

				// TODO: Scale up the source width/height for bigger screens?

				this.canvasCtx.drawImage(
					this.imageSprite, 
					this.spritePos.START_BUTTON.x, 
					this.spritePos.START_BUTTON.y, 
					startButtonSourceWidth, 
					startButtonSourceHeight, 
					0, 
					0, 
					startButtonDimensions.START_BUTTON_WIDTH, 
					startButtonDimensions.START_BUTTON_HEIGHT
					);

				//this.hero = new Hero(this.canvas);

				this.startListening();
				// Already run update function even before the game starts so that we could already show
				// our hero blink or something. This update function is just here to make the canvas look like a 60FPS game.
				//this.update();
			},


			/**
			* Starts gameplay.
			*/
			start: function() {
				this.isPlaying = true;
				console.log("Start playing.");

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
					this.start();
				}
			}
		}
	}
</script>