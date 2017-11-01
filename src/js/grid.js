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

	// Here we simply holds all occupied coordinates and their respective coordinates.
	// We don't have to remember the shapes so we can just store all coordinates per color.
	this.tetrominoes = {}

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
		return Array(rowSpan).fill().map(() => Array(colSpan).fill(0));
	},


	update: function(task, coordinates, color) {
		// Check whether to draw the coordinates 0 or 1.
		// Also use this for color whether to use tetromino color or grid background color for the coordinate.
		var activation = (task == "draw" ? 1 : 0);  

		for(var i = 0; i < coordinates.length; i++) {
			var x = coordinates[i][0];
			var y = coordinates[i][1];
			// TODO: now also draw this out.
			this.playingField[y][x] = activation;
		}
	},


	spawnTetromino: function(tetromino) {
		this.currTetromino = tetromino;

		this.update(this.currTetromino.coordinates, this.currTetromino.color);

		// When landed push hold the landing coordinates and the colors of it.
		// this.tetrominoes[this.currTetromino.color].push(this.currTetromino.coordinates);
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

