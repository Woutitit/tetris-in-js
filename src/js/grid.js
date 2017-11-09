function Grid(canvasCtx, colSpan, rowSpan, cellSpan) {
	this.init(rowSpan, colSpan);
}

Grid.prototype = {
	init: function(rowSpan, colSpan) {
		var gridData = Array(rowSpan).fill().map(() => Array(colSpan).fill(0));
	}
}

export default Grid;