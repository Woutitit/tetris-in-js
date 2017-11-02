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
	this.occupiedCells = {
		purple: []
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

		// Now also put 1's at the first AND last values of each row
		// Add 1's to the bottom row aswell for colission.
	},


	/**
	* Check for new occupied (=landed) cells, update the backend playingfield with these cells and also draw them.
	*/
	update: function() {
		// Every update we draw the playing field with 0's first and then fill them up according to the coordinates.
		// This might be slow. Is there a better way?
		this.playingField = this.create(this.COL_SPAN, this.ROW_SPAN);

		Object.keys(this.occupiedCells).forEach((key, index) => {
			var color = key;

			// For each coordinate per color
			for(var i = 0; i < this.occupiedCells[color].length; i++) {
				var x = this.occupiedCells[color][i][0];
				var y = this.occupiedCells[color][i][1];

				this.playingField[y][x] = 1; // The cell at this coordinate gets a 1.
				this.draw(x, y, color);
			}
		});
	},


	/**
	* Draw a single set of x, y coordinates and its color. Use this in conjunction with a loop.
	*/ 
	draw: function(x, y, color) {
		this.canvasCtx.fillStyle = "#000";
		this.canvasCtx.fillRect(0, 0, 20, 20);
	},


	/**
	* Pushes coordinates that also should be occupied to the global occupiedCells object.
	*/
	occupyCells: function(coordinates) {
		coordinates.forEach((coordinate) => {
			this.occupiedCells.purple.push(coordinate);
		});
	},


	/**
	* Removes coordinates that should no longer be occupied from the global occupiedCells object.
	*/
	deoccupyCells: function(coordinates) {
		for(var i = 0; i < coordinates.length; i++) {
			this.occupiedCells.purple.pop();
		}
	},

	removeLine: function() {
		// For removing lines we need better than pop.
		// However we can find out the x coordinate of which cells to remove.
		// And then remove all "occupiedCells" which, at position [0] (so x), have that x coordinate.
	}
}

export default Grid;

