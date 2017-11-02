function Tetromino(grid) {
	this.COLOR = "orange" // TODO: Make color based on shape.
	this.SHAPE = [[0, 0, 0, 0], [1, 1, 1, 1]];
	this.SPAWN_POS_X = 3;
	this.SPAWN_POS_Y = 0;

	this.coordinates = [];

	this.grid = grid;

	this.dropStart = 0;
	this.DROP_SPEED = 500;

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
		this.grid.occupyCells(this.coordinates);
	},


	// TODO MAKE THE NEW POSITION BASED ON MOVEMENT
	// THIS ONLY WORKS FOR DOWN MOVEMENT YET.
	// ALSO MAKE THE LAST ROW AND 2 COLUMNS LEFT AND RIGHT FULL WITH 1's.
	// THIS WAY WE CAN DETECT WHEN IT HITS A WALL AS WELL.
	// ALSO HOW DO WE KNOW IF IT LANDED?
	// If next coordinate are 1's AND direction of the played move is down, if that is invalid ONLY then it means it has landed because it can't go down more.
	// The move "down" will always decide because either the drop plays it, or the player plays it.
	// We should also have a boolean that has landed = true;
	// And that would mean
	move: function(direction) {
		var oldCoordinates = this.coordinates;
		var newCoordinates = [];

		for(var i = 0; i < oldCoordinates.length; i++) {
			var newX = oldCoordinates[i][0];
			var newY = oldCoordinates[i][1];

			if(direction === "left") newX--;
			if(direction === "right") newX++;
			if(direction === "down") newY++;

			// Collision detection. Checks whether the new coordinates would be occupied or out of bounds.
			if(this.grid.playingField[newY] === undefined || this.grid.playingField[newY][newX] === undefined || 
				this.grid.playingField[newY][newX] === 1) {
				if(direction === "down") this.landed = true; // If the move is not valid AND direction was down, the tetromino has landed.
				return; // Stay at the old coordinates.
			} else {
				newCoordinates.push([newX, newY]);
			}
		}

		// Only update coordinates if all new coordinates are free.
		this.coordinates = newCoordinates; 

		// Now unassign the old coordinates and assign the newly occupied cells.
		this.grid.deoccupyCells(oldCoordinates);
		this.grid.occupyCells(this.coordinates);
		
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