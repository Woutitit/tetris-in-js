function Tetromino() {
	this.COLOR = "orange" // TODO: Make color based on shape.
	this.SHAPE = [[0, 0, 0, 0], [1, 1, 1, 1]];
	this.SPAWN_POS_X = 3;
	this.SPAWN_POS_Y = 0;

	this.coordinates = [];

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
		this.determineSpawnCoordinates(this.SPAWN_POS_X, this.SPAWN_POS_Y);
	},
	determineSpawnCoordinates: function(spawnPosX, spawnPosY) {
		var spawnY = spawnPosY;

		for(var i = 0; i < this.SHAPE.length; i++) {
			var spawnX = spawnPosX;

			for(var j = 0; j < this.SHAPE[i].length; j++) {
				if (this.SHAPE[i][j] === 1) {
					this.coordinates.push([spawnX, spawnY]);
				}
				spawnX++;
			}
			spawnY++;
		}
	}
}

export default Tetromino;