function Grid(colSpan, rowSpan, canvas, celSpan) {
	/*--------------------------------------------------------------------------------------------
	HOW THE GRID WORKS.
	----------------------------------------------------------------------------------------------
	* On the backend the grid is a multidimensional array (or matrix).
	* 0 means a free space.
	* 1 means occupied space.

	This grid matrix will be updated everytime a tetromino spawns, moves, gets destroyed.
	This way we can easily keep track of collision, when to destroy a row and such.

	IMPORTANT: We can use THIS grid in our neural network as state like outlace did.

	This is how a playing field of 10x16 would look like:

	 var grid = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
		]
	--------------------------------------------------------------------------------------------
	--------------------------------------------------------------------------------------------*/
	this.COL_SPAN = colSpan;
	this.ROW_SPAN = rowSpan;

	this.CELL_SPAN = celSpan;

	this.playingField = [];
	this.SPAWN_POS = 3; // Default spawn position for tetromino.

	this.canvas = canvas;
	this.canvasCtx = canvas.getContext("2d");

	// Holds coordinates of ALL occupied cells organized by color.
	this.occupiedCells = {
		orange: [ [1, 2] ],
		purple: [ [1, 3], [5, 4] ]
	}; 

	this.currTetromino; // Holds tetromino we can control.


	this.init();	// Intializes backend and frontend playing field.
}

Grid.prototype = {
	/**
	* Initialize playing field by creating and drawing initial grid.
	*/
	init: function() {
		this.playingField = this.create(this.COL_SPAN, this.ROW_SPAN);

	},


	/**
	* Create playing field backend.
	*/
	create: function(colSpan, rowSpan) {
		// Note: we add + 2 to the backend grid so that our tetrominoes spawn off canvas before they come in the field.
		return Array(rowSpan + 2).fill().map(() => Array(colSpan).fill(0));
	},


	update: function(task, coordinates, color) {
		// Check whether to draw or undraw the coordinates. Undraw is represented by 0 and draw by 1.
		// Also use this for color whether to use tetromino color or grid background color for the coordinate.
		/*
		var activation = (task == "draw" ? 1 : 0);  

		// So we have the playing field

		for(var i = 0; i < coordinates.length; i++) {
			var x = coordinates[i][0];
			var y = coordinates[i][1];
			// TODO: now also draw this out.
			this.playingField[y][x] = activation;
		}
		*/

		// Coordinates of all occupied cells organized by color.
		Object.keys(this.occupiedCells).forEach((key, index) => {
			var color = key;

			for(var i = 0; i < this.occupiedCells[color].length; i++) {
				var x = this.occupiedCells[color][i][0];
				var y = this.occupiedCells[color][i][1];

				this.playingField[y][x] = 1; // The cell at this coordinate gets a 1.
				// TODO: Now also draw this cell with the respective color.
			}
		});

		// When a tetromino spawns. Hold its coordinates apart for collision detection.
		// However also push its coordinates to the coordinates object.
		// When it moves we should then always DESTROY the coordinates from the coordinates object and PUSH the new coordinates.
	},

	checkCollision: function() {
		// So for example when clicked "Left" we should check if any coordinates + 1 (to the left) matches any coordinates already on field.
		// So for example coordinates[0][1 + 1] = any coordinate already on the field?
		// If it was down it would be [0 + 1][1] to check if the move is valid.
		// Also when a move is valid (so if this return true) we should first use the current coordinates to make these 1's to 0's.
		// And THEN we can increase the coordinates and make these NEW coordinates 1's.
	}
}

export default Grid;

