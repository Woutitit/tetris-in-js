/**
* Game.
* @param {string} outerContainerEl Outer containing element.
* @constructor
* @export
*/
function Game(outerContainerEl) {
	this.outerContainerEl = outerContainerEl;

	this.canvas = null;
	this.canvasCtx = null;

	// Canvas dimensions.
	this.dimensions = {
		WIDTH: 570,
		HEIGHT: 320
	}
}


Game.prototype = {
	init: function() {
		var container = document.createElement("div");

		this.canvas = createCanvas(this.dimensions.WIDTH, this.dimensions.HEIGHT);
		this.canvasCtx = this.canvas.getContext("2d");

		container.appendChild(this.canvas); //To hold canvas.
		this.outerContainerEl.appendChild(container);

		// Draw hero
		new Hero(this.canvas)
	},

	start: function() {
		//Now draw terrain and let it proceed frame by frame
	}
}


/**
* Hero game character.
* @param {HTMLCanvasElement} canvas
* @constructor
*/
function Hero(canvas) {
	this.canvas = canvas;
	this.canvasCtx = this.canvas.getContext("2d");

	this.hitbox = new HitBox(0, 0, 20, 30); // In this case very easy. Just the measurements of the rectangle.

	this.init();
}


Hero.prototype = {
	init: function() {
		console.log("Dit is de hero class.");
	}
}


/**
* Hit box object.
* @param {number} x X position.
* @param {number} y Y Position.
* @param {number} w Width.
* @param {number} h Height.
*/
function HitBox(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
};


/**
* Create canvas element.
* @param {number} width
* @param {number} height
* @return {HTMLCanvasElement}
*/
function createCanvas(width, height){
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	return canvas;
}

export default Game;
