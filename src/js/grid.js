function Grid(colSpan, rowSpan, canvas, canvasWidth, parent) {
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

	this.CELL_SPAN = canvasWidth / colSpan;

	// Colors used to color the spaces that tetrominoes occupy.
	this.GRID_COLORS = {
		1: "cyan",
		2: "blue",
		3: "orange",
		4: "yellow",
		5: "green",
		6: "purple",
		7: "red"
	};

	this.playingField = [];
	this.SPAWN_POS = 3; // Default spawn position for tetromino.

	this.canvas = canvas;
	this.canvasCtx = canvas.getContext("2d");
	this.parent = parent;

	this.currTetromino; // Holds tetromino we can control.

	// Intializes backend and frontend playing field.
	this.playingField = this.createBackend(colSpan, rowSpan);	
}

Grid.prototype = {
	/**
	* Create playing field backend matrix.
	* @param {Number} colSpan - Number of columns.
	* @param {Number} rowSpan - Number of rows.
	* @return {Array}
	*/
	createBackend: function(colSpan, rowSpan) {
		return Array(rowSpan).fill().map(() => Array(colSpan).fill(0));
	},


	/**
	* Insert a block of a tetromino at a certain x/y coordinate.
	* @param {Number} x.
	* @param {Number} y.
	* @param {Number} colorValue.
	*/
	insert: function(x, y, colorValue) {
		this.playingField[y][x] = colorValue;
	},


	/**
	* Detect full lines on the playing field.
	* @param {Array} rowCoordinates - Optional. Array of y coordinates that specify on which rows to look.
	*/
	detectLines: function(rowsInserted) {
		// TODO: We should also add this to a "row" counter for the UI.
		var lines = 0;

		rowsInserted.forEach((y) => {
			var count = 0;

			this.playingField[y].forEach((x) => {
				if(x !== 0) { count++; }
			});

			if (count === 10) {
				lines++;
				this.clearLine(y);
			}
		});

		// Update score according to the line count.
		if(lines !== 0) {
			var score = 0;
			switch(lines) {
				case 1:
				score = 1 * 40 + 40; // Level times 40 + 40. We should make this level dynamic.
				break;

				case 2:
				score = 1 * 100 + 100;
				break;

				case 3:
				score = 1 * 300 + 300;
				break;

				case 4:
				score = 1 * 1200 + 1200;
				break;
			}
			this.parent.updateScore(score);
		}
		
	},


	/**
	* Clear a certain line.
	* @param {Number} rowCoordinate.
	*/
	clearLine: function(y) {
		// TODO: Add a small delay for spawning new tetromino until when all rows are cleared.
		this.playingField[y].forEach((value, x) => {
			this.playingField[y][x] = 0;
			this.undraw(x, y);
		});

		// Will drop all tetrominoes above cleared line.
		this.dropTetrominoes(y);
		
	},


	/**
	* Drop all tetrominoes.
	* @param {Number} rowCoordinate - The row coordinate to determine which rows have to drop after a line clear.
	*/
	dropTetrominoes: function(y) {
		// Start from cleared row and move up.
		for (var i = y; i >= 0; i--) {
			// Special case for top row where we make all the values simply 0 after line clear.
			if(i === 0) {
				this.playingField[i].forEach((colorValue, index) => {
					this.playingField[i][index] = 0;
				});
			}
			// Else make all values the ones from one row above and redraw them.
			else {
				this.playingField[i].forEach((colorValue, index) => {
					// Replace current row with row above it.
					this.playingField[i][index] = this.playingField[i - 1][index];

					// Also if the block above current row is filled we should undraw and redraw it at the new position.
					if(this.playingField[i - 1][index] !== 0) {
						this.undraw(index, i - 1);
						this.draw(index, i, this.playingField[i - 1][index]);
					}	
				});
			}
		};
	},


	/**
	* Draw a single set of x, y coordinates and its color.
	* @param {Number} x.
	* @param {Number} y.
	* @param {Number} colorValue.
	*/ 
	draw: function(x, y, colorValue) {
		// IMPORTANT: Instead of drawing and undrawing we could smootthly move our rectangles (for example with a liner clear).
		// The backend area would obviously still immediately update but we can simply smoothly move our rectangles down as much as necessary.
		this.canvasCtx.fillStyle = this.GRID_COLORS[colorValue];
		this.canvasCtx.fillRect(x * this.CELL_SPAN, y * this.CELL_SPAN, this.CELL_SPAN, this.CELL_SPAN);
	},


	/**
	* Undraws/Clears any rectangles at given x/y coordinates.
	* @param {Number} x.
	* @param {Number} y.
	*/ 
	undraw: function(x, y) {
		this.canvasCtx.clearRect(x * this.CELL_SPAN, y * this.CELL_SPAN, this.CELL_SPAN, this.CELL_SPAN);
	}
}

export default Grid;