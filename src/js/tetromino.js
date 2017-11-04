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
		// Will stop executing if the move is not valid. Else it will return the new top left coordinate.
		// ONLY PROBLEM. IF TOP LEFT IS NOT OCCUPIED. FOR EXAMPLE WHEN THE I IS VERTICAL. THEN TOP LEFT WILL BE OUT OF BOUNDS.
		// OR WILL IT BE OUT OF BOUNDS?
		// BECAUSE BASED ON TOP LEFT COORDINATE WE GET THE SHAPES COORDINATE AND IF THAT SHAPE IS 2 AWAY.
		// THEN IT WILL BE -2 +1 +1 = 0 index until it finds something. BECAUSE WITH THE TOPLEFT COORDINATE WE ALSO DON'T DO ANY CHECKS ON THE PLAYING FIELD
		// THE ONLY THING WE DO THIS IS TO KEEP TRACK OF OUR SHAPES COORDINATES IN ANY ROTATION.
		// THIS WAY WE CAN EASILY ROTATE THE PIECE AND FIND THE COORDINATES FOR THAT ROTATION.
		// SO ITS JUST IMPORTANT TO NOT CHECK TOPLEFT ON THE PLAYING FIELD BUT ONLY USE TOPLEFT TO GET THE SHAPE COORDINATES AND CHECK THOSE ON THE PLAYING FIELD.
		// THE SPAWN DEFAULT VALUES FOR TOP LEFT ARE INDICES 2 FOR X AND 0 FOR Y.
		// var newTopLeft = this.validateMove(direction);

		// If move is valid execute the move and update our canvas.
		this.undrawShape();
		this.topLeft.y++;
		this.drawShape();
	},


	validateMove: function(direction) {
		var potentialTopLeft = {
			x: this.topLeft.x,
			y: this.topLeft.y
		}

		switch(direction) {
			case "down":
			potentialTopLeft.y++;
			case "left":
			potentialTopLeft.x--;
			case "right":
			potentialTopLeft.x++;
		}

		// If this is a valid move then return the new potential top left.
		if(!this.validatePotentialCoordinates(potentialTopLeft)) {
			return;
		} else {
			return potentialTopLeft;
		}
	},

	validPotentialCoordinates: function(potentialTopLeft) {
		var potentialY = this.potentialTopLeft.y;

		this.shape.forEach((row) => {

			var potentialX =  this.potentialTopLeft.x;

			// Check for this coordinate if grid is empty.
			// TODO: CAN WE MAKE THIS EACH BLOCK IN A SEPERATE FUNCTION WITH CALLBACK?
			row.forEach((colorValue) => {
				if(colorValue !== 0) {
					if(this.grid.isFull(potentialX, potentialY)) {
						return false;
					}	
				}
				currentX++; // Make next x coordinate current x to insert into grid if necessary.
			})
			currentY++; // Make next row current Y coordinate
		});
	},


	/**
	* Draws ALL the current tetromino's coordinates on the grid.
	*/
	draw: function() {
		this.coordinates.forEach((coordinate) => {
			var x = coordinate[0];
			var y = coordinate[1];

			this.grid.draw(x, y, "yellow");
		})
	},

	/**
	* Undraws ALL the current tetromino's coordinates on the grid.
	*/
	undraw: function() {
		this.coordinates.forEach((coordinate) => {
			var x = coordinate[0];
			var y = coordinate[1];

			this.grid.draw(x, y, "#FFF");
		})
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