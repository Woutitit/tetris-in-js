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

	// Here we simply holds all occupied coordinates and their respective coordinates
	// We don't have to remember the shapes so we can just store all coordinates per color.
	this.tetrominoes = {
		orange: [
		[3, 1], 
		[3, 2], 
		[3, 3], 
		[3, 4]
		],
		purple: [
		[4, 1], 
		[4, 2], 
		[4, 3], 
		[4, 4]
		]
	}


	this.init();	// Intializes backend and frontend playing field.
}

Grid.prototype = {
	/**
	* Initialize playing field by creating and drawing initial grid.
	*/
	init: function() {
		this.playingField = this.create(this.COL_SPAN, this.ROW_SPAN);
		// So we should store currTetromino and when it has landed we should push it to the tetrominoes variable that holds all landed tetrominoes' coordinates
		// and colors.

		Object.keys(this.tetrominoes).forEach((key,index) => {
			var coordinates = this.tetrominoes[key];
			var color = key; // We can use this to draw this coordinate this particular color.

			for(var i = 0; i < coordinates.length; i++) {
				var x = coordinates[i][0];
				var y = coordinates[i][1];
				// I guess here we already have drawn all the good 1's. So we just have to draw here.
				this.playingField[y][x] = 1;
			}
		});

		var currTetromino = {
			color: "orange",
			shape: [
				[0, 0, 0, 0],
				[1, 1, 1, 1]
			],
			coordinates: []
		}

		
		var startY = 1;

		// This is just to initialize the tetromino. Once we know the starting coordinates we can simply use the coordinates + color
		// to color these particular fields.
		for(var i = 0; i < currTetromino.shape.length; i++) {
			var startX = 3;
			for(var j = 0; j < currTetromino.shape[i].length; j++) {
				if (currTetromino.shape[i][j] === 1) {
					currTetromino.coordinates.push([startX, startY]);
				}
				startX++;
			}
			startY++;
		}

		for(var i = 0; i < currTetromino.coordinates.length; i++) {
				var x = currTetromino.coordinates[i][0];
				var y = currTetromino.coordinates[i][1];
				// I guess here we already have drawn all the good 1's. So we just have to draw here.
				this.playingField[y][x] = 1;
		}
	},


	/**
	* Create playing field backend.
	*/
	create: function(colSpan, rowSpan) {
		return Array(rowSpan).fill().map(() => Array(colSpan).fill(0));
	}
}

export default Grid;

