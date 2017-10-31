function Grid(colSpan, rowSpan, canvas) {
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

	this.playingField = [];

	this.canvas = canvas;
	this.canvasCtx = canvas.getContext("2d");

	this.init(colSpan, rowSpan);	// Intializes backend and frontend playing field.
}

Grid.prototype = {
	/**
	* Initialize playing field by creating and drawing initial grid.
	*/
	init: function() {
		this.playingField = this.create(this.COL_SPAN, this.ROW_SPAN);

		this.drawBackground();
	},


	/**
	* Create playing field backend.
	*/
	create: function(colSpan, rowSpan) {
		return Array(colSpan).fill().map(() => Array(rowSpan).fill(0));
	},


	/**
	* Draw playing field.
	*/
	drawBackground: function() {
		this.canvasCtx.fillStyle = "#EEE";

		var h = 0;

		for(var i = 0; i < this.playingField.length; i++) {
			var row = this.playingField[i];

			var w = 0;
			


			for(var j = 0; j < row.length; j++) {
				this.canvasCtx.fillRect(w, h, 10, 10);
				w += 10
			}

			h += 10;
		}
	},


	/**
	* Update playing field.
	*/
	update: function() {
		
	}
}

export default Grid;

