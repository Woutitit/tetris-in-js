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


	move: function(direction) {
		// So what a valid move dus is is NOT occupying ANY CELLS.
		// But this means however our grid will NOT pick up on these coordinates of current tetrominoes thus not drawing them.
		// Is this bad? Like for RL we then should use current coordinates + occupied coordinates rather than the playing field.
		// This is also how this link does it: https://gamedevelopment.tutsplus.com/tutorials/implementing-tetris-collision-detection--gamedev-852
		// They have a landed array (which is the playing field) and they also only push coordinates to it when a tetromino has landed.
		var oldCoordinates = this.coordinates;
		var newCoordinates = [];

		for(var i = 0; i < oldCoordinates.length; i++) {
			var newX = oldCoordinates[i][0];
			var newY = oldCoordinates[i][1];

			if(direction === "left") newX--;
			if(direction === "right") newX++;
			if(direction === "down") newY++;

			// Collision detection. Checks whether the new coordinates would be occupied or out of bounds.
			if (this.grid.playingField[newY] === undefined || this.grid.playingField[newY][newX] === undefined || 
				this.grid.playingField[newY][newX] === 1) {
				if(direction === "down") {
					this.landed = true;
					this.grid.occupyCells(this.coordinates);
				}
				
				return;// If the move is not valid AND direction was down, the tetromino has landed.
			} else {
				newCoordinates.push([newX, newY]);
			}

		}
		
		// Only update coordinates if all new coordinates are free.
		this.coordinates = newCoordinates; 
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