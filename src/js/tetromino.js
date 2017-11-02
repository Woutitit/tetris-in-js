function Tetromino(grid) {
	this.COLOR = "orange" // TODO: Make color based on shape.
	this.SHAPE = [[0, 0, 0, 0], [1, 1, 1, 1]];
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
	init: function() {
		this.spawn();
	},


	determineSpawnCoordinates: function() {
		var spawnY = this.SPAWN_POS_Y;

		for(var i = 0; i < this.SHAPE.length; i++) {
			var spawnX = this.SPAWN_POS_X;

			for(var j = 0; j < this.SHAPE[i].length; j++) {
				if (this.SHAPE[i][j] === 1) {
					this.coordinates.push([spawnX, spawnY]);
				}
				spawnX++;
			}
			spawnY++;
		}
	},


	spawn: function() {
		this.determineSpawnCoordinates();
		//this.grid.occupyCells(this.coordinates);
	},


	/**
	* Move the current tetromino. Will move ONLY if the direction in which it wants to move is valid.
	*/

	move: function(direction) {
		var oldCoordinates = this.coordinates;
		var newCoordinates = [];

		for(var i = 0; i < oldCoordinates.length; i++) {
			var newX = oldCoordinates[i][0];
			var newY = oldCoordinates[i][1];

			// Create "potential" coordinates based on direction for each current coordinates.
			if(direction === "left") newX--;
			if(direction === "right") newX++;
			if(direction === "down") newY++;

			// Collision detection. Checks whether the new coordinates would be occupied or out of bounds.
			if (this.grid.playingField[newY] === undefined || this.grid.playingField[newY][newX] === undefined || 
				this.grid.playingField[newY][newX] === 1) {

				// If there will be collision at the potential coordinates AND the move is down it means the tetromino has landed.
				if(direction === "down") {
					this.landed = true;
					this.grid.occupyCells(this.coordinates); // ONLY now occupy these cells so next tetrominoes can detect collision on it.
				}
				
				return; // Since the move was invalid we don't need to update the coordinates.
			} 
			else {
				newCoordinates.push([newX, newY]);
			}

		}

		// Only update coordinates if all new coordinates are free.
		this.coordinates = newCoordinates;
		this.grid.update(this.coordinates, this.color);
	},


	/**
	* Make tetromino go to the next position granted that position is empty.
	*/
	nextPos: function(direction) {

	},


	rotate: function() {
		console.log("lol");
	},


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