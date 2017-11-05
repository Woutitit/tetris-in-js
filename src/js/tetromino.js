function Tetromino(grid, shape) {
	/*--------------------------------------------------------------------------------------------
	HOW SHAPES WORK
	----------------------------------------------------------------------------------------------
	
	
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
	* Will execute callback function for each FULL block giving as argument that current x, y and color value.
	*/
	eachBlock: function(callback) {
		var currentY = this.topLeft.y;

		this.shape.forEach((row) => {

			var currentX =  this.topLeft.x;

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
		this.eachBlock((x, y, colorValue) => {
			this.grid.draw(x, y, colorValue);
		});
	},


	/*
	* Undraw tetromino based on current rotation and top left coordinate.
	*/
	undrawShape: function() {
		this.eachBlock((x, y, colorValue) => {
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
		return true;	
	},


	updatePosition: function(potentialTopleft) {
		this.undrawShape();
		this.topLeft = potentialTopleft;
		this.drawShape();
	},


	land: function() {
		this.landed = true;
		/*
		this.eachBlock((x, y, colorValue) => {
			this.grid.insert(x, y, colorValue);
		});
		*/
	},


	/*
	* Rotate the tetromino. Will ONLY rotate if the rotation is a valid move to make.
	*/
	rotate: function() {
		// So here we should update our coordinates.
		// Then we should also draw these new coordinates.
		// Rotation is always 90 degrees.
		// How can we make a rotation method that works for all coordinates?
		// Or should we make these rotation shapes ourselves?
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