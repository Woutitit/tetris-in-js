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


	update: function(coordinates, color) {
		for(var i = 0; i < coordinates.length; i++) {
			var x = coordinates[i][0];
			var y = coordinates[i][1];
			// Also draw here based on the color.
			this.playingField[y][x] = 1;
		}
		console.log(this.playingField);
	},


	spawnTetromino: function(tetromino) {
		this.currTetromino = tetromino;

		this.update(this.currTetromino.coordinates, this.currTetromino.color);

		// When landed push hold the landing coordinates and the colors of it.
		// this.tetrominoes[this.currTetromino.color].push(this.currTetromino.coordinates);
	},

	checkCollision: function() {
		// So we should go through ALL current coordinates and check if they would match any coordinates already landed.
	}
}

export default Grid;

