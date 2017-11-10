export default {
	// All tetromino spawn shapes defined in a square grid.
	spawnShapes: {
		I: [ [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0] ],
		J: [ [2, 0, 0], [2, 2, 2], [0, 0, 0] ],
		L: [ [0, 0, 3], [3, 3, 3], [0, 0, 0] ], 
		O: [ [0, 0, 0, 0], [0, 4, 4, 0],[0, 4, 4, 0], [0, 0, 0, 0] ],
		S: [ [0, 5, 5], [5, 5, 0],[0, 0, 0] ],
		T: [ [0, 6, 0],[6, 6, 6],[0, 0, 0] ],
		Z: [ [7, 7, 0], [0, 7, 7],[0, 0, 0] ]
	},

	/**
	* Return random tetromino shape.
	*/
	random: function() {
		// TODO: Keep track of spawned shapes and favor shapes that have not been spawned much.
		var keys = Object.keys(this.spawnShapes);

		return this.spawnShapes[keys[Math.floor(Math.random() * keys.length)]];
	}
}