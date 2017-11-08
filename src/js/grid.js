function Grid(colSpan, rowSpan, canvas, celSpan) {
	/*--------------------------------------------------------------------------------------------
	HOW THE GRID WORKS.
	----------------------------------------------------------------------------------------------
	* On the backend the grid is a multidimensional array (or matrix).
	* 0 means a free space.
	* 1 means occupied space.

	This grid matrix will be updated everytime a tetromino has landed.
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
	* Check for new occupied (=landed) cells, update the backend playingfield with them and destroy rows if necesarry.
	*
	*/
	insert: function(x, y, colorValue) {
		this.playingField[y][x] = colorValue;

		this.detectRow(y);
	},


	detectRow: function(y) {
		// We should also ad this to a "row" counter for the UI.
		var count = 0;
		this.playingField[y].forEach((x) => {
			if(x !== 0) { count++; }
		});

		if (count === 10) {
			this.removeRow(y);
		}
	},

	// TODO: Add a small delay for spawning new tetromino until when all rows are cleared.
	removeRow: function(y) {
		this.playingField[y].forEach((value, x) => {
			this.playingField[y][x] = 0;
			this.undraw(x, y);
		});
		for (var i = y; i >= 0; i--) {
			// Special case for top row where we make all the values simply 0.
			if(i === 0) {
				this.playingField[i].forEach((colorValue, index) => {
					this.playingField[i][index] = 0;
				});
			}
			else {
			this.playingField[i].forEach((colorValue, index) => {
				// Replace current row with row above it.
				this.playingField[i][index] = this.playingField[i - 1][index];

				// Also if the block above current row is filled we should undraw and redraw it at the new position.
				if(this.playingField[i - 1][index] !== 0) {
					this.undraw(index, i - 1);
					this.draw(index, i, "#000");
				}	
			});
		}
		};
	},


	/**
	* 
	*/
	validateCell: function(x, y) {
		if(this.playingField[y] === undefined || this.playingField[y][x] === undefined || this.playingField[y][x] === 1) {
			return false;
		}
	},


	/**
	* Check for new occupied (=landed) cells, update the backend playingfield with them and destroy rows if necesarry.
	*
	*/
	update: function(x, y, value) {
		//this.playingField = this.create(this.COL_SPAN, this.ROW_SPAN);
		coordinatesPair.forEach((coordinates) => {
			this.playingField[coordinates[1]][coordinates[0]] = 1;
		});
	},


	/**
	* Draw a single set of x, y coordinates and its color. Use this in conjunction with a loop.
	*/ 
	draw: function(x, y, color) {
		this.canvasCtx.fillStyle = color;
		this.canvasCtx.fillRect(x * this.CELL_SPAN, y * this.CELL_SPAN, this.CELL_SPAN, this.CELL_SPAN);
	},


	/**
	* Undraws/Clears any rectangles at a certain coordinate.
	*/ 
	undraw: function(x, y) {
		this.canvasCtx.clearRect(x * this.CELL_SPAN, y * this.CELL_SPAN, this.CELL_SPAN, this.CELL_SPAN);
	},


	undrawRow: function(y) {
		// Note: x will always be 0 when undrawing a row.
		this.canvasCtx.clearRect(0, y * this.CELL_SPAN, this.CELL_SPAN * this.COL_SPAN, this.CELL_SPAN);
	},

	drawRow: function(y) {
		// Note: x will always be 0 when undrawing a row.
		this.canvasCtx.fillRect(0, y * this.CELL_SPAN, this.CELL_SPAN * this.COL_SPAN, this.CELL_SPAN);
	},


	/**
	* Pushes coordinates that also should be occupied to the global occupiedCells object.
	*/
	occupyCells: function(coordinates, color) {
		
		coordinates.forEach((coordinate) => {
			this.occupiedCells[color].push(coordinate);
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



	checkFullRows: function() {
		// Check if a row contains all 1's meaning that line should be removed.
		// Now we check each row however we know we should only check the rows of the y coordinates of the last 4 coordinates that landed.
		this.playingField.forEach((row, index) => {
			if((row.filter((x) => x === 1 ).length) === this.COL_SPAN) {
				this.removeRow(index); // index is the y coordinate that should be removed.
			}
		})
	}
}

export default Grid;

