function Tetromino(shape, grid) {
	this.defaultConfig = {
		DROP_SPEED: 1000
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
		if(!this.grid.testMove(direction, this.shape)) {
			if (direction === "down") this.landed = true;
		};
	},


	rotate: function() {
		var shapeDimensions = this.shape.length;
		var layerCount = this.shape.length / 2;

		var firstElIndex = 0;
		var lastElIndex = shapeDimensions - 1; // -1 because the length is 4 but index is from 0 to 3 so last element will be at index = 3.

		// Create array where we will hold our test shape.
		// We fill it with the shape's color value so not be empty AND to have blocks that not rotate be filled at all times.
		var potentialShape = Array(shapeDimensions).fill().map(() => Array(shapeDimensions).fill(this.COLOR_VALUE));
		// If rotation is valid, undraw current shape before executing rotation.
		
		for (var layer = 0; layer < layerCount; layer++) {
			// Loop from first element in layer PER SIDE (so left, top, right and bottom) to last element.
			for(var i = 0; i < lastElIndex - firstElIndex; i++) {
				// Get element values

				var currTop = this.shape[firstElIndex][firstElIndex + i];
				var currRight = this.shape[firstElIndex + i][lastElIndex];
				var currBottom = this.shape[lastElIndex][lastElIndex - i];
				var currLeft = this.shape[lastElIndex - i][firstElIndex];
				
				potentialShape[firstElIndex][firstElIndex + i] = currLeft;
				potentialShape[firstElIndex + i][lastElIndex] = currTop;
				potentialShape[lastElIndex][lastElIndex - i] = currRight;
				potentialShape[lastElIndex - i][firstElIndex] = currBottom;
				
			}
			firstElIndex++;
			lastElIndex--;
		}

		// Test shape
		if(this.grid.testRotation(potentialShape)) {
			this.grid.undrawShape(this.shape);
			this.shape = potentialShape;
			this.grid.drawShape(this.shape);

		}
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