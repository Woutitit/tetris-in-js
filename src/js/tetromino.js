function Tetromino(shape) {
	this.shape = shape;

	this.init();
}


Tetromino.prototype = {
	init: function() {
		console.log(this.shape);
	}

}

export default Tetromino;