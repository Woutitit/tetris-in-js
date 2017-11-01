function Tetromino(grid) {
	this.COLOR = "orange" // TODO: Make color based on shape.
	this.SHAPE = [[0, 0, 0, 0], [1, 1, 1, 1]];
	this.SPAWN_POS_X = 3;
	this.SPAWN_POS_Y = 0;

	this.coordinates = [];

	this.grid = grid;

	this.dropStart = 0;
	this.DROP_SPEED = 1000;

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


	move: function(direction) {
		switch(direction) {
			case "left":
			this.nextPos(direction);
			break;

			case "right":
			this.nextPos(direction);
			break;

			case "down":
			this.nextPos(direction);
			break;
		}
	},


	/**
	* Make tetromino go to the next position granted that position is empty.
	*/
	nextPos: function(direction) {
		// For each coordinate pair:
		// Increment (if necessary) the coordinates (according to which move is made) by 1. 
		// Check on the playingfield if the position at this coordinate is occupied.
		// If yes => We don't need to continue looping so stop it by doing "return". The move will have done nothing because the next pos is invalid.
		// If there has not been a "return" it means that all next move spaces are empty => So update the global coordinates.
		// Also push these new coordinates to the grid's occupiedCells object.
		// The grid's update method will pick up the new coordinates.
		var increment = 0;
		var axis = "";

		switch(direction) {
			case "left":
			increment = -1;
			axis = "x";
			break;

			case "right":
			increment = 1;
			axis = "x";
			break;

			case "down":
			increment = 1;
			axis = "y";
			break;
		}

		// TODO MAKE THE NEW POSITION BASED ON MOVEMENT
		// THIS ONLY WORKS FOR DOWN MOVEMENT YET.
		// ALSO MAKE THE LAST ROW AND 2 COLUMNS LEFT AND RIGHT FULL WITH 1's.
		// THIS WAY WE CAN DETECT WHEN IT HITS A WALL AS WELL.
	
		var oldCoordinates = this.coordinates;
		var newCoordinates = [];

		for(var i = 0; i < oldCoordinates.length; i++) {
			var newX = oldCoordinates[i][0]
			var newY = oldCoordinates[i][1] + 1;

			if(this.grid.playingField[newY][newX] === 1) {
				return;
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