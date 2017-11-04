function Tetromino(grid, letter) {
	this.SHAPE = letter;
	this.SPAWN_POS_X = 3;
	this.SPAWN_POS_Y = 0;

	this.coordinates = [];

	this.grid = grid;

	this.dropStart = 0;
	this.DROP_SPEED = 1000;

	this.landed = false;

	this.init();
}


Tetromino.prototype = {
	/* 
	* Initialize tetromino.
	*/
	init: function() {
		this.spawn();
	},


	/* 
	* Determine the starting coordinates when a tetromino first spawns.
	*/
	determineSpawnCoordinates: function() {
		var spawnY = this.SPAWN_POS_Y;

		for(var i = 0; i < this.SHAPE.length; i++) {
			var spawnX = this.SPAWN_POS_X;

			for(var j = 0; j < this.SHAPE[i].length; j++) {
				if (this.SHAPE[i][j] !== 0) {
					this.coordinates.push([spawnX, spawnY]);
				}
				spawnX++;
			}
			spawnY++;
		}
	},


	/*
	* Spawn tetromino at the top of the playing field.
	*/
	spawn: function() {
		this.determineSpawnCoordinates();
		this.draw();
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
		var newTopLeft = this.validateMove(direction);

		// If move is valid execute the move and update our canvas.
		this.undraw();
		this.topLeft = newTopLeft;
		this.draw();
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

		// Check the coordinates based on current shape rotation and potential top left coordinate.
		if(this.validPotentialCoordinates(potentialTopLeft)) {
			return potentialTopLeft;
		} else {
			return;
		}
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