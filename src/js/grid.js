function Grid(canvasCtx, colSpan, rowSpan, cellSpan) {
	this.defaultConfig = {
		SPAWN_TOP_LEFT: { x: 3, y: 0 }, // Top left spawn coordinates on the grid for tetrominoes.
		GRID_COLORS: {
			1: "cyan",
			2: "blue",
			3: "orange",
			4: "yellow",
			5: "green",
			6: "purple",
			7: "red"
		}
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
		});

		this.detectLines();
	},


	detectLines: function() {
		var lines = 0;
		var linesToClear = [];


		this.gridData.forEach((value, index) => {
			var y = index;
			var count = 0;

			value.forEach((x) => {
				if(x !== 0) { count++; }
			});

			if (count === 10) {
				lines++;
				linesToClear.push(y);
			}
		});

		if(linesToClear.length > 0) this.clearLines(linesToClear);
	},


	clearLines: function(lines) {
		// Again we can make the visual appear like all the lines blink and then get destroyed.
		// However for optimization of our backend we will immediatly also drop tetrominoes per line clear.
		lines.forEach((line) => {
			this.gridData[line].forEach((value, index) => {
				var x = index;
				var y = line;

				this.gridData[y][x] = 0;
				this.undraw(x, y);
			});

			this.dropTetrominoes(line);
		});
	},


	dropTetrominoes: function(lineTreshold) {
		// Start from cleared row and move up.
		for (var i = lineTreshold; i >= 0; i--) {
			// Special case for top row where we make all the values simply 0 after line clear.
			if(i === 0) {
				this.gridData[i].forEach((colorValue, index) => {
					this.gridData[i][index] = 0;
				});
			}
			// Else make all values the ones from one row above and redraw them.
			else {
				this.gridData[i].forEach((colorValue, index) => {
					// Replace current row with row above it.
					this.gridData[i][index] = this.gridData[i - 1][index];

					// Also if the block above current row is filled we should undraw and redraw it at the new position.
					if(this.gridData[i - 1][index] !== 0) {
						this.undraw(index, i - 1);
						this.draw(index, i, this.gridData[i - 1][index]);
					}	
				});
			}
		};
	},


	insert: function(x, y, colorValue) {
		this.gridData[y][x] = colorValue
	},


	draw: function(x, y, colorValue) {
		this.canvasCtx.fillStyle = this.defaultConfig.GRID_COLORS[colorValue];
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


	testRotation: function(shape) {
		return this.testBlocks(this.currTopLeft, shape) ? true : false;
	},


	testMove: function(direction, shape) {
		var potentialTopLeft = this.getPotentialTopLeft(direction);

		if(this.testBlocks(this.getPotentialTopLeft(direction), shape)) {
			this.undrawShape(shape);
			this.currTopLeft = potentialTopLeft;
			this.drawShape(shape);

			return true;
		} 
		else if (direction === "down") {
			this.landShape(shape);

			return false;
		}
	},


	testBlocks: function(topLeft, shape) {
		var errors = 0;

		this.eachBlock(topLeft, shape, (x, y, colorValue) => {
			if(this.gridData[y] === undefined || this.gridData[y][x] === undefined || this.gridData[y][x] !== 0) {
				errors++;
			}
		});

		return errors === 0 ? true : false;
	},


	eachBlock: function(topLeft=this.currTopLeft, shape, callback) {
		var currentY = topLeft.y;

		shape.forEach((row) => {

			var currentX = topLeft.x;

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