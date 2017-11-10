function Grid(canvasCtx, colSpan, rowSpan, cellSpan) {
	this.defaultConfig = {
		SPAWN_TOP_LEFT: { x: 3, y: 0 } // Top left spawn coordinates on the grid for tetrominoes.
	};

	this.canvasCtx = canvasCtx;

	this.cellSpan = cellSpan;

	this.gridData;

	this.currTopLeft = this.defaultConfig.SPAWN_TOP_LEFT; // Current tetromino top left coordinates.

	this.init(rowSpan, colSpan);
}

Grid.prototype = {
	init: function(rowSpan, colSpan) {
		this.gridData = Array(rowSpan).fill().map(() => Array(colSpan).fill(0));
	},


	resetTopLeft: function() {
		this.currTopLeft = this.defaultConfig.SPAWN_TOP_LEFT;
	},


	drawShape: function(shape) {
		this.eachBlock(this.currTopLeft, shape, (x, y, colorValue) => {
			this.draw(x, y, colorValue);
		});
	},


	undrawShape: function(shape) {
		this.eachBlock(this.currTopLeft, shape, (x, y, colorValue) => {
			this.undraw(x, y);
		});
	},


	landShape: function(shape) {
		this.eachBlock(this.currTopLeft, shape, (x, y, colorValue) => {
			this.insert(x, y, colorValue);
		})
	},


	insert: function(x, y, colorValue) {
		this.gridData[y][x] = colorValue
	},


	draw: function(x, y, colorValue) {
		this.canvasCtx.fillStyle = "#000";
		this.canvasCtx.fillRect(x * this.cellSpan, y * this.cellSpan, this.cellSpan, this.cellSpan);
	},


	undraw: function(x, y) {
		this.canvasCtx.clearRect(x * this.cellSpan, y * this.cellSpan, this.cellSpan, this.cellSpan);
	},


	getPotentialTopLeft: function(direction) {
		var potentialTopLeft = {
			x: this.currTopLeft.x,
			y: this.currTopLeft.y
		}

		switch(direction) {
			case "down":
			potentialTopLeft.y++;
			break;

			case "left":
			potentialTopLeft.x--;
			break;

			case "right":
			potentialTopLeft.x++;
			break;
		}

		return potentialTopLeft;
	},


	updatePosition: function(direction, shape) {
		var potentialTopLeft = this.getPotentialTopLeft(direction);

		var positionIsLegal = this.testPosition(potentialTopLeft, shape);

		if(positionIsLegal) {
			this.undrawShape(shape)
			this.currTopLeft = potentialTopLeft;
			this.drawShape(shape);

			return true;
		}
		else if(direction === "down") {
			this.landShape(shape);
		}

		return false;
	},


	testPosition: function(potentialTopLeft, shape) {
		var errors = 0;

		this.eachBlock(potentialTopLeft, shape, (x, y, colorValue) => {
			if(this.gridData[y] === undefined || this.gridData[y][x] === undefined || this.gridData[y][x] !== 0) {
				errors++;
			}
		});

		return errors === 0 ? true : false;
	},


	eachBlock: function(topLeft, shape, callback) {
		var currentY = topLeft.y;

		shape.forEach((row) => {

			var currentX =  topLeft.x;

			row.forEach((colorValue) => {
				if(colorValue !== 0) {
					callback(currentX, currentY, colorValue);
				}
				currentX++; // Make next x coordinate current x to insert into grid if necessary.
			})
			currentY++; // Make next row current Y coordinate
		});
	}
}

export default Grid;