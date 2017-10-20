/**
* Game.
* @param {string} outerContainerId Outer containing element id.
* @constructor
* @export
*/
function Game(outerContainerEl) {
	this.outerContainerEl = outerContainerEl;

	this.canvas = null;
	this.canvasCtx = null;

	this.dimensions = Game.dimensions;
}

/**
* Canvas dimensions.
* @enum {string}
*/
Game.dimensions = {
	WIDTH: 570,
	HEIGHT: 320
}


Game.prototype = {
	init: function() {
		var container = document.createElement("div");

		this.canvas = createCanvas(this.dimensions.WIDTH, this.dimensions.HEIGHT);
		this.canvasCtx = this.canvas.getContext("2d");
		this.canvasCtx.fillStyle = "#f7f7f7";
		this.canvasCtx.fill();

		container.appendChild(this.canvas); //To hold canvas
		this.outerContainerEl.appendChild(container);
	}
}


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
