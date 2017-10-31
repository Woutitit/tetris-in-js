function Game() {
	// GAME CONSTANTS
	this.gridDimensions = { COLS: 10, ROWS: 16 };

	this.grid;
}

Game.prototype = {
	/**
	* Initialize game.
	*/
	init: function() {
		this.grid = new Grid(this.gridDimensions.COLS, this.gridDimensions.ROWS);
	}
}