function Tetromino(grid, letter) {
	this.SHAPE = letter;
	this.SPAWN_POS_X = 3;
	this.SPAWN_POS_Y = 0;

	this.coordinates = [];

	this.grid = grid;

	this.dropStart = 0;
	this.DROP_SPEED = 1000;

	this.landed = false;

	// SO INSTEAD OF KEEPING TRACK OF ALL THE COORDINATES.
	// WE WILL HAVE A 4x4 GRID AND ONLY KEEP TRACK OF THE COORDINATE OF THE TOPLEFT
	// WITH THIS COORDINATE + THE CURRENT ROTATION
	// WE CAN CHECK AND ADD + 1 (DEPENDING ON DIRECTION) TO EACH COORDINATE OF THE SHAPE WHICH IS NOT 0
	// AND CHECK IF THESE POTENTIAL COORDINATES ON THE PLAYING FIELD ARE ACTUALLY 0.
	// IF NOT 0 AND DIRECTION IS DOWN IT MEANS THE TETROMINO HAS LANDED.
	// THEN WE SHOULD DO AGAIN A LOOP STARTING FROM TOP LEFT AND THEN AGAIN FOR EACH SHAPE VALUE WHICH IS NOT 0
	// WE SHOULD FIND OUT THE VALUE (FOR EXAMPLE 6) and update the grid. DO this.grid.update(x, y, value); Value here means color.
	// ELSE IF ALL PLAYINGFIELD SPACES ARE FREE
	// DO A LOOP AND
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
		var currentCoordinates = this.coordinates;
		var potentialCoordinates = [];

		for(var i = 0; i < currentCoordinates.length; i++) {
			var potentialX = currentCoordinates[i][0];
			var potentialY = currentCoordinates[i][1];

			// Create "potential" coordinates based on direction for each current coordinates.
			if(direction === "left") potentialX--;
			if(direction === "right") potentialX++;
			if(direction === "down") potentialY++;

			// Collision detection. Checks whether the new coordinates would be occupied or out of bounds.
			if (this.grid.playingField[potentialY] === undefined || this.grid.playingField[potentialY][potentialX] === undefined || this.grid.playingField[potentialY][potentialX] !== 0) {
			// If there will be collision at the potential coordinates AND the move is down it means the tetromino has landed.
			if(direction === "down") {
				this.landed = true;
				this.grid.update(this.coordinates); // ONLY now occupy these cells so next tetrominoes can detect collision on it.
			}

			return; // When ANY new coordinate is invalid DON'T execute the move.
		}

		potentialCoordinates.push([potentialX, potentialY]);
	}

		// Only update coordinates if all new coordinates are free.
		this.undraw();
		this.coordinates = potentialCoordinates;
		this.draw(); // Draw the new coordinates on the grid.
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