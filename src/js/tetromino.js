function Tetromino(grid, shape) {
	/*--------------------------------------------------------------------------------------------
	HOW SHAPES WORK
	----------------------------------------------------------------------------------------------
	
	ROTATION:
	Since our shapes are defined in a 4x4 grid we have 2 layers.

	2 2 2 2
	2 1 1 2
	2 1 1 2
	2 2 2 2

	Since both these layers are bigger than a 1x1 matrix they will change when wanting to rotate them 90 degrees.
	We do this by first setting up a loop that goes through each layer. A loop will look like this:
	"For layer 1, do everything what you write in this loop."

	Next step. Since elements that get rotated don't hop layers we can simply set up a nested loop in this layer loop that will go through all
	elements in the particular layer. A loop (for a 4x4 matrix) will look like this:
	"Get element at the top right in layer x (= 1st pos of 1st row)"
	"Get element at top right in layer x (= 1st pos of last column)"
	"Get element at bottom right in layer x"
	"Get element at bottom left in layer x"
	"Now make top right = top left, top left = bottom left and bottom right = top right"

	Next:
	"Get element at position 2 at top in layer x"
	"Get element at position 2 at right in layer x"
	"Get element at position 2 (COUNTED FROM LAST ELEMENT SINCE CLOCKWISE ROTATION, SO ACTUALLY ELEMENT AT POSITION 3) at bottom in layer x"
	"Get element at position 2 (COUNTED FROM LAST ELEMENT SINCE CLOCKWISE ROTATION, SO ACTUALLY ELEMENT AT POSITION 3) at left in layer x"
	"Now assign all new values"

	You can make the remark like "but if you already assign values to the matrix in that loop it will screw with the values and not giving correct
	values to rotate?" Well indeed, but that's the genious of this loop. As you can see, ALL the values we GET we ALSO IMMEDIATELY REPLACE.
	And since we need to get each value and replace it only 1 time this is totally fine!

	Note: that this method only works for matrixes where width and height are the same.
	
	--------------------------------------------------------------------------------------------
	--------------------------------------------------------------------------------------------*/
	this.shape = shape;
	this.grid = grid;

	this.topLeft = {
		x: 3,
		y: 0
	};

	this.dropStart = 0;
	this.DROP_SPEED = 1000;

	this.landed = false;

	this.init();
}


Tetromino.prototype = {
	/* 
	* Draw tetromino on canvas.
	*/
	init: function() {
		this.drawShape();
	},

	/*
	* Will give coordinates of each FULL block given a certain top left coordinate.
	*/
	eachBlock: function(topLeft, callback) {
		var currentY = topLeft.y;

		this.shape.forEach((row) => {

			var currentX =  topLeft.x;

			row.forEach((colorValue) => {
				if(colorValue !== 0) {
					//this.grid.draw(currentX, currentY, colorValue);
					callback(currentX, currentY, colorValue);
				}
				currentX++; // Make next x coordinate current x to insert into grid if necessary.
			})
			currentY++; // Make next row current Y coordinate
		});
	},


	/*
	* Draw tetromino based on the current rotation and top left coordinate.
	*/
	drawShape: function() {
		this.eachBlock(this.topLeft, (x, y, colorValue) => {
			this.grid.draw(x, y, colorValue);
		});
	},


	/*
	* Undraw tetromino based on current rotation and top left coordinate.
	*/
	undrawShape: function() {
		this.eachBlock(this.topLeft, (x, y, colorValue) => {
			this.grid.undraw(x, y, colorValue);
		});
	},


	/**
	* Move the current tetromino. Will move ONLY if the direction in which it wants to move is valid.
	* @param {String} direction
	*/
	move: function(direction) {
		var potentialTopleft = this.getPotentialTopLeft(direction); // Get position we want to go to.

		if(this.validPosition(potentialTopleft)) {
			this.updatePosition(potentialTopleft);
		} 
		else if(direction === "down") {
			this.land(this.topLeft); // If move is not valid and direction is down, land at CURRENT position.
		}
	},


	getPotentialTopLeft: function(direction) {
		var potentialTopLeft = {
			x: this.topLeft.x,
			y: this.topLeft.y
		}

		switch(direction) {
			case "down":
			potentialTopLeft.y++;
			break;

			case "left":
			potentialTopLeft.x--;
			break;

			case "right":
			potentialTopLeft.x++;
			break;
		}

		return potentialTopLeft;
	},


	validPosition: function(potentialTopleft) {
		var errors = 0;
		
		this.eachBlock(potentialTopleft, (x, y, colorValue) => {
			// Check if cell for the blocks future position is defined or not occupied yet.
			if(this.grid.playingField[y] === undefined || this.grid.playingField[y][x] === undefined || this.grid.playingField[y][x] !== 0) {
				return errors++;
			}
		});
		
		return errors > 0 ? false : true;
	},


	updatePosition: function(potentialTopleft) {
		this.undrawShape();
		this.topLeft = potentialTopleft;
		this.drawShape();
	},


	land: function() {
		this.landed = true;
		this.eachBlock(this.topLeft, (x, y, colorValue) => {
			this.grid.insert(x, y, colorValue);
		});
	},


	/*
	* Rotate the tetromino. Will ONLY rotate if the rotation is a valid move to make.
	*/
	rotate: function() {
		var matrixDimensions = this.shape.length;
		var layerCount = this.shape.length / 2;

		var first_index = 0;
		var last_index = this.matrixDimensions - 1; // -1 Because length is 4 but indices are from 0 to 3.

		for (var layer = 0; layer < layerCount; layer++) {
			for(var el = 0; el < matrixDimensions; el++) {
				console.log("lol");
			}
		}

		
		/*
		this.undrawShape(); // If rotation appeared to be valid first undraw the current shape.
		this.shape = rotation // Set shape to new rotation.
		this.drawShape(); // Draw the new shape.
		*/
	},


	/*
	* Drops tetromino at a certain interval rate.
	*/
	drop: function() {
		if(this.dropStart === 0) {
			this.dropStart = new Date().getTime();
		}

		if(new Date().getTime() - this.dropStart > this.DROP_SPEED) {
			this.move("down");
			this.dropStart = 0;
		}
	}
}

export default Tetromino;