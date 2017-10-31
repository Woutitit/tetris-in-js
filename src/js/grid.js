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

	this.canvas = canvas;
	this.canvasCtx = canvas.getContext("2d");

	this.init();	// Intializes backend and frontend playing field.
}

Grid.prototype = {
	/**
	* Initialize playing field by creating and drawing initial grid.
	*/
	init: function() {
		this.playingField = this.create(this.COL_SPAN, this.ROW_SPAN);
		console.log(this.playingField);

		this.drawBackground();
	},


	/**
	* Create playing field backend.
	*/
	create: function(colSpan, rowSpan) {
		return Array(rowSpan).fill().map(() => Array(colSpan).fill(0));
	},


	/**
	* Draw playing field.
	*/
	drawBackground: function() {
		this.canvasCtx.fillRect = "#EEE";
		var y = 0;

		for(var i = 0; i < this.playingField.length; i++) {
			var row = this.playingField[i];

			var x = 0;

			for(var j = 0; j < row.length; j++) {
				this.canvasCtx.fillRect(x, y, this.CELL_SPAN, this.CELL_SPAN);
				x += this.CELL_SPAN;
			}

			y += this.CELL_SPAN;
		}
	},


	/**
	* Update playing field.
	*/
	update: function() {
		
	}
}

export default Grid;

