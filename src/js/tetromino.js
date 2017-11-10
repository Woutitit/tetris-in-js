function Tetromino(shape) {
	this.shape = shape;
}


Tetromino.prototype = {
	spawn: function(grid) {
		grid.resetTopLeft();
		grid.drawShape(this.shape);
	}
}

export default Tetromino;