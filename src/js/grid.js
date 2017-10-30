function Grid(canvasWidth, canvasHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;

	this.cellWidth = canvasWidth / 10;
	this.cellHeight = canvasHeight / 20;

	this.init();

}

Grid.prototype = {
	init: function() {
		new Cell(cellWidth, cellHeight);
	}
}

export default Grid;