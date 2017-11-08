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

	this.GRID_COLORS = {
		1: "#000",
		2: "blue",
		3: "red",
		4: "purple",
		5: "blue",
		6: "green",
		7: "yellow"
	};

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
		// TODO: We should also add this to a "row" counter for the UI.
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

		// Will drop all tetrominoes above cleared line.
		this.dropTetrominoes(y);
		
	},


	dropTetrominoes: function(y) {
		// Start from cleared row and move up.
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
					var newColor = this.playingField[i - 1][index];

					this.playingField[i][index] = this.playingField[i - 1][index];

					// Also if the block above current row is filled we should undraw and redraw it at the new position.
					if(this.playingField[i - 1][index] !== 0) {
						this.undraw(index, i - 1);
						this.draw(index, i, newColor);
					}	
				});
			}
		};
	},


	/**
	* Draw a single set of x, y coordinates and its color. Use this in conjunction with a loop.
	*/ 
	draw: function(x, y, colorValue) {
		this.canvasCtx.fillStyle = this.GRID_COLORS[colorValue];
		this.canvasCtx.fillRect(x * this.CELL_SPAN, y * this.CELL_SPAN, this.CELL_SPAN, this.CELL_SPAN);
	},


	/**
	* Undraws/Clears any rectangles at a certain coordinate.
	*/ 
	undraw: function(x, y) {
		this.canvasCtx.clearRect(x * this.CELL_SPAN, y * this.CELL_SPAN, this.CELL_SPAN, this.CELL_SPAN);
	}
}

export default Grid;

