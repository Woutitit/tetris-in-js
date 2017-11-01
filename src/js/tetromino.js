function Tetromino(grid) {
	this.COLOR = "orange" // TODO: Make color based on shape.
	this.SHAPE = [[0, 0, 0, 0], [1, 1, 1, 1]];
	this.SPAWN_POS_X = 3;
	this.SPAWN_POS_Y = 0;

	this.coordinates = [];

	this.grid = grid;

	/*
	LETTERS: {
		L: {
			color:
			shape: [[]]
		}
	}
	*/

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
		var increment = 0;
		var axis = 0; // 0 means x-axis movement. 1 means y-axis movement.

		switch(direction) {
			case "left":
			increment = -1;
			axis = 0;
			break;

			case "right":
			increment = 1;
			axis = 0;
			break;

			case "down":
			increment = 1;
			axis = 1;
			break;
		}

		for(var i = 0; i < this.coordinates.length; i++) {
			// The color should be the same as he background color.
			this.grid.update("undraw", this.coordinates, this.color);
			this.coordinates[i][axis] += increment; // When push down add 1 to all y coordinates to move them one cell down.
			// TODO: First undraw the current y coordinates and make them 0;
			this.grid.update("draw", this.coordinates, this.color);
		}
	},

	rotate: function() {
		console.log("lol");
	}
}

export default Tetromino;