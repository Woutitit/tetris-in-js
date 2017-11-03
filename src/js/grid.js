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
	// We should generate this array based on all possible color rather than setting it manually.
	this.occupiedCells = [];

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
		return Array(rowSpan).fill().map(() => Array(colSpan).fill(0));

		// Now also put 1's at the first AND last values of each row
		// Add 1's to the bottom row aswell for colission.
	},


	/**
	* Check for new occupied (=landed) cells, update the backend playingfield with them
	* Do note that we do not have to draw anything here since when the current tetromino lands, that drawing will stay on the canvas.
	* It's only important to keep updating the backend to detect collision for the current tetromino.
	* Also, everytime we update the grid means that a tetromino has landed. Thus we will also need to check for lines at the y coordinates of current tetromino.
	* But since we only need to check the rows in which the last coordinate landed,
	* we can simply take the last 4 coordinates of the occupiedCells array and then get the y coordinates for it.
	* Then we should check if at these y coordinates (so those rows in playing field) ALL the values are 1. 
	* If at at least one of that this is true we should remove these coordinates frome the occupiedCells.
	* This will make the playingfield output 0 for that row.
	*/
	update: function() {
		this.playingField = this.create(this.COL_SPAN, this.ROW_SPAN);
		
		// For each coordinate per color
		for(var i = 0; i < this.occupiedCells.length; i++) {
			var x = this.occupiedCells[i][0];
			var y = this.occupiedCells[i][1];

			this.playingField[y][x] = 1; // The cell at this coordinate gets a 1.
		}

		// Check if a row contains all 1's meaning that line should be removed.
		// Now we check each row however we know we should only check the rows of the y coordinates of the last 4 coordinates.
		this.playingField.forEach((row, index) => {
			if((row.filter((x) => x === 1 ).length) === this.COL_SPAN) {
				this.removeRow(index);
			}
		})
		/*
		// Check for all the last landed coordinates.
		for(var j = 1; j <= 4; j++) {
			var y = this.occupiedCells[this.occupiedCells.length - j][1];

			var c = 0;

			this.playingField[y].forEach((x) => {
				if(x === 1) {
					c++;
				}
			})

			if(c === 10) {
				this.removeLine(this.playingField.indexOf(this.playingField[y]));
			}
		}
		*/

	},


	/**
	* Draw a single set of x, y coordinates and its color. Use this in conjunction with a loop.
	*/ 
	draw: function(x, y, color) {
		this.canvasCtx.fillStyle = color;
		this.canvasCtx.fillRect(x * this.CELL_SPAN, y * this.CELL_SPAN, this.CELL_SPAN, this.CELL_SPAN);
	},


	/**
	* Pushes coordinates that also should be occupied to the global occupiedCells object.
	*/
	occupyCells: function(coordinates) {
		coordinates.forEach((coordinate) => {
			this.occupiedCells.push(coordinate);
		});

		this.update();
	},


	/**
	* Removes coordinates that should no longer be occupied from the global occupiedCells object.
	*/
	deoccupyCells: function(coordinates) {
		for(var i = 0; i < coordinates.length; i++) {
			this.occupiedCells.purple.pop();
		}
	},

	removeRow: function(rowCoordinate) {
		this.occupiedCells.forEach((coordinates, index) => {
			var occupiedCellY = coordinates[1];

			if(occupiedCellY === rowCoordinate) {
				this.occupiedCells.splice(index);
			}
		});

		this.update();
	}
}

export default Grid;

