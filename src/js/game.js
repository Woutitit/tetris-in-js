/**
* Game.
* @param {string} outerContainerId Outer containing element id.
* @constructor
* @export
*/
function Game(outerContainerEl) {
	this.outerContainerEl = outerContainerEl;
}


Game.prototype = {
	init: function() {
		document.createElement("div");
		createCanvas();
	}
}


/**
* Canvas dimensions.
* @enum {string}
*/
Game.dimensions = {

}


/**
* Create canvas element.
* @param {HTMLElement} container Element to append canvas to.
* @param {number} width
* @param {number} height
* @return {HTMLCanvasElement}
*/
function createCanvas(container, width, height){
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	container.appendChild(canvas);

	return canvas;
}

export default Game;
