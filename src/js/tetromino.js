function Tetromino(shape, grid) {
	this.defaultConfig = {
		DROP_SPEED: 100
	};

	this.shape = shape;

	this.grid = grid;

	this.dropStart = 0; // To time when another drop can occur.

	this.landed = false;

	this.spawn();
}


Tetromino.prototype = {
	spawn: function(grid) {
		this.grid.resetTopLeft();
		this.grid.drawShape(this.shape);
	},


	move: function(direction) {
		if(!this.grid.updatePosition(direction, this.shape)) {
			this.landed = true;
		};
	},


	drop: function() {
		if(this.dropStart === 0) {
			this.dropStart = new Date().getTime();
		}

		if(new Date().getTime() - this.dropStart > this.defaultConfig.DROP_SPEED) {
			this.move("down");
			this.dropStart = 0;
		}
	}
}

export default Tetromino;