function Game(gameCanvas) {
	this.canvas = null;
	this.canvasCtx = null;
}

/**
* Default dimensions.
* @enum {string}
*/
Game.prototype = {
	init: function() {
		createCanvas();
	}
}

/**
* Default dimensions.
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
//TODO: Get this out of the global scope with self-contained function and make a module of it
function createCanvas(container, width, height){
	alert("lo");
}

export default Game;
