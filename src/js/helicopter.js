import Bullet from "./bullet.js";

function Helicopter(canvas, canvasBoundaries, spriteSheet, spritePosX, spritePosY) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");
	this.canvasBoundaries = canvasBoundaries;

	this.spriteSheet = spriteSheet;
	this.spritePosX = spritePosX;
	this.spritePosY = spritePosY;

	this.dimensions = { WIDTH: 61, HEIGHT: 32 }

	this.posX = 10;
	this.posY = 50;

	this.GUN_POS_X = this.dimensions.WIDTH;
	this.GUN_POS_Y = this.dimensions.HEIGHT - 12; // Subtract value because gun is not fully at bottom of helicopter.

	this.ACCELERATION = 3; // Instead we could also always add + 1 or something with a max speed to make a more smooth movement.

	this.bullets = [];

	this.SHOOTING_COOLDOWN_TRESHOLD = 100;
	this.shootingStartTime = 0;
}

Helicopter.prototype = {
	/**
	* Draw helicopter.
	*/
	draw: function(posX, posY) {

		var helicopterSourceWidth = this.dimensions.WIDTH;
		var helicopterSourceHeight = this.dimensions.HEIGHT;

		this.canvasCtx.drawImage(
			this.spriteSheet, 
			this.spritePosX, 
			this.spritePosY, 
			helicopterSourceWidth, 
			helicopterSourceHeight, 
			posX, 
			posY, 
			this.dimensions.WIDTH, 
			this.dimensions.HEIGHT
			);
	},


	/**
	* If used in conjunction with requestAnimationFrame() it will update position of helicopter.
	*/
	update: function() {
		this.draw(this.posX, this.posY);
		

		// If bullets present on screen, move each bullet.	
		if(this.bullets && this.bullets.length > 0) {
			this.bullets.forEach((bullet) => {
				bullet.update();
			})
		}
		
	},


	/**
	* Move helicopter in certain direction.
	* @param {String} direction
	*/
	move: function(direction) {
		// First check if the copter is not at the edges of the canvas yet. If not it can move.
		// Also if it's less than the acceleration speed from the edge it should go the distance to the edge instead.
		// So make a new hitbox object and then check if the edges of the hitbox reaches the bounds of the canvas.
		// We could also make multiple hitbox object. One for the helicopter body, one for the wings, ... 
		// This way our helicopter has multiple hitboxes and you can target more realistically the shapes of the helicopter.
		// However if you're okay with just one box around the helicopter that is kind of accurate, then that's also fine.

		switch(direction) {
			case "left":
			this.posX -= this.ACCELERATION;
			break;
			case "up":
			this.posY -= this.ACCELERATION;
			break;
			case "right":
			this.posX += this.ACCELERATION;
			break;
			case "down":
			this.posY += this.ACCELERATION;
			break;
		}
	},


	/**
	* Enables controls for helicopter to be able to move it.
	* @param {Array} keysPressed
	* @param {Object} keyBindings
	*/
	enableControls: function(keysPressed, keyBindings) {
		// Will trigger when AT LEAST one key is pressed. isPlaying = true means we only need to check for helicopter movement here.
		if(keysPressed.length > 0) {
			// Currently we can only assign ONE key to MOVE_UP. Later we should be able to assign more and check for them.
			if (keysPressed.includes(keyBindings.MOVE_LEFT)) {
				this.move("left");
			}

			if (keysPressed.includes(keyBindings.MOVE_UP)) {
				this.move("up");
			}

			if (keysPressed.includes(keyBindings.MOVE_RIGHT)) {
				this.move("right");
			}

			if (keysPressed.includes(keyBindings.MOVE_DOWN)) {
				this.move("down");
			}

			if (keysPressed.includes(keyBindings.SHOOT)) {
				this.shoot();
			}
		}
	},


	shoot: function() {
		// First bullet or after cooldown.
		if(this.shootingStartTime === 0) {
			this.shootingStartTime = new Date().getTime();
			this.bullets.push(new Bullet(this.canvas, this.posX, this.posY, this.GUN_POS_X, this.GUN_POS_Y));
		}

		var shootingCooldownTime = new Date().getTime() - this.shootingStartTime;

		// When bullet is shot, if cooldown is over reset shootingStartTime var to shoot again.
		if(shootingCooldownTime > this.SHOOTING_COOLDOWN_TRESHOLD) {
			this.shootingStartTime = 0;
		}
	}
}

export default Helicopter;