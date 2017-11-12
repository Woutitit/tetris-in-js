/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);


(function () {
  new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
})();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grid_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tetromino_js__ = __webpack_require__(4);




function Game() {
	this.canvas = document.getElementById("tetris");
	this.canvasCtx = this.canvas.getContext("2d");

	this.colSpan = 10;
	this.rowSpan = 16;
	this.size = 20;

	this.canvas.width = this.colSpan * this.size;
	this.canvas.height = this.rowSpan * this.size;

	this.cellSpan = this.canvas.width / this.colSpan;

	this.grid = null;
	this.currTetromino = null;

	this.init(); // Initialize game.
}

Game.prototype = {
	init: function () {
		this.grid = new __WEBPACK_IMPORTED_MODULE_1__grid_js__["a" /* default */](this.canvasCtx, this.colSpan, this.rowSpan, this.cellSpan);

		this.startListening();

		this.update();
	},

	update: function () {
		if (!this.currTetromino || this.currTetromino.landed) {
			this.currTetromino = new __WEBPACK_IMPORTED_MODULE_2__tetromino_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* default */].random(), this.grid);
		};

		this.currTetromino.drop();

		requestAnimationFrame(this.update.bind(this));
	},

	startListening: function () {
		document.addEventListener("keydown", this);
	},

	handleEvent: function (event) {
		switch (event.type) {
			case "keydown":
				this.onKeyDown(event.key);
				break;
		}
	},

	onKeyDown: function (key) {
		switch (key) {
			case "ArrowLeft":
				this.currTetromino.move("left");
				break;

			case "ArrowUp":
				this.currTetromino.rotate();
				break;

			case "ArrowRight":
				this.currTetromino.move("right");
				break;

			case "ArrowDown":
				this.currTetromino.move("down");
				break;
		}
	}

};

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	// All tetromino spawn shapes defined in a square grid.
	spawnShapes: {
		I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
		J: [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
		L: [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
		O: [[0, 0, 0, 0], [0, 4, 4, 0], [0, 4, 4, 0], [0, 0, 0, 0]],
		S: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
		T: [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
		Z: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
	},

	/**
 * Return random tetromino shape.
 */
	random: function () {
		// TODO: Keep track of spawned shapes and favor shapes that have not been spawned much.
		var keys = Object.keys(this.spawnShapes);

		return this.spawnShapes[keys[Math.floor(Math.random() * keys.length)]];
	}
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
	init: function (rowSpan, colSpan) {
		this.gridData = Array(rowSpan).fill().map(() => Array(colSpan).fill(0));
	},

	resetTopLeft: function () {
		this.currTopLeft = this.defaultConfig.SPAWN_TOP_LEFT;
	},

	drawShape: function (shape) {
		this.eachBlock(this.currTopLeft, shape, (x, y, colorValue) => {
			this.draw(x, y, colorValue);
		});
	},

	undrawShape: function (shape) {
		this.eachBlock(this.currTopLeft, shape, (x, y, colorValue) => {
			this.undraw(x, y);
		});
	},

	landShape: function (shape) {

		this.eachBlock(this.currTopLeft, shape, (x, y, colorValue) => {
			this.insert(x, y, colorValue);
		});

		this.detectLines();
	},

	detectLines: function () {
		var lines = 0;
		var linesToClear = [];

		this.gridData.forEach((value, index) => {
			var y = index;
			var count = 0;

			value.forEach(x => {
				if (x !== 0) {
					count++;
				}
			});

			if (count === 10) {
				lines++;
				linesToClear.push(y);
			}
		});

		if (linesToClear.length > 0) this.clearLines(linesToClear);
	},

	clearLines: function (lines) {
		// Again we can make the visual appear like all the lines blink and then get destroyed.
		// However for optimization of our backend we will immediatly also drop tetrominoes per line clear.
		lines.forEach(line => {
			this.gridData[line].forEach((value, index) => {
				var x = index;
				var y = line;

				this.gridData[y][x] = 0;
				this.undraw(x, y);
			});

			this.dropTetrominoes(line);
		});
	},

	dropTetrominoes: function (lineTreshold) {
		// Start from cleared row and move up.
		for (var i = lineTreshold; i >= 0; i--) {
			// Special case for top row where we make all the values simply 0 after line clear.
			if (i === 0) {
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
						if (this.gridData[i - 1][index] !== 0) {
							this.undraw(index, i - 1);
							this.draw(index, i, this.gridData[i - 1][index]);
						}
					});
				}
		};
	},

	insert: function (x, y, colorValue) {
		this.gridData[y][x] = colorValue;
	},

	draw: function (x, y, colorValue) {
		this.canvasCtx.fillStyle = this.defaultConfig.GRID_COLORS[colorValue];
		this.canvasCtx.fillRect(x * this.cellSpan, y * this.cellSpan, this.cellSpan, this.cellSpan);
	},

	undraw: function (x, y) {
		this.canvasCtx.clearRect(x * this.cellSpan, y * this.cellSpan, this.cellSpan, this.cellSpan);
	},

	getPotentialTopLeft: function (direction) {
		var potentialTopLeft = {
			x: this.currTopLeft.x,
			y: this.currTopLeft.y
		};

		switch (direction) {
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

	testRotation: function (shape) {
		return this.testBlocks(this.currTopLeft, shape) ? true : false;
	},

	testMove: function (direction, shape) {
		var potentialTopLeft = this.getPotentialTopLeft(direction);

		if (this.testBlocks(this.getPotentialTopLeft(direction), shape)) {
			this.undrawShape(shape);
			this.currTopLeft = potentialTopLeft;
			this.drawShape(shape);

			return true;
		} else if (direction === "down") {
			this.landShape(shape);

			return false;
		}
	},

	testBlocks: function (topLeft, shape) {
		var errors = 0;

		this.eachBlock(topLeft, shape, (x, y, colorValue) => {
			if (this.gridData[y] === undefined || this.gridData[y][x] === undefined || this.gridData[y][x] !== 0) {
				errors++;
			}
		});

		return errors === 0 ? true : false;
	},

	eachBlock: function (topLeft = this.currTopLeft, shape, callback) {
		var currentY = topLeft.y;

		shape.forEach(row => {

			var currentX = topLeft.x;

			row.forEach(colorValue => {
				if (colorValue !== 0) {
					callback(currentX, currentY, colorValue);
				}
				currentX++; // Make next x coordinate current x to insert into grid if necessary.
			});
			currentY++; // Make next row current Y coordinate
		});
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Grid);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Tetromino(shape, grid) {
	this.defaultConfig = {
		DROP_SPEED: 1000
	};

	this.shape = shape;
	this.COLOR_VALUE = 0;
	this.grid = grid;
	this.dropStart = 0; // To time when another drop can occur.
	this.landed = false;

	this.spawn();
}

Tetromino.prototype = {
	spawn: function (grid) {
		// Hack to get color value. Need to improve this.
		this.shape.forEach(row => {
			row.forEach(value => {
				if (value !== 0) {
					this.COLOR_VALUE = value;
				}
			});
		});

		this.grid.resetTopLeft();
		this.grid.drawShape(this.shape);
	},

	move: function (direction) {
		if (!this.grid.testMove(direction, this.shape)) {
			if (direction === "down") this.landed = true;
		};
	},

	rotate: function () {
		var shapeDimensions = this.shape.length;
		var layerCount = this.shape.length / 2;

		var firstElIndex = 0;
		var lastElIndex = shapeDimensions - 1; // -1 because the length is 4 but index is from 0 to 3 so last element will be at index = 3.

		// Create array where we will hold our test shape.
		// We fill it with the shape's color value so not be empty AND to have blocks that not rotate be filled at all times.
		var potentialShape = Array(shapeDimensions).fill().map(() => Array(shapeDimensions).fill(this.COLOR_VALUE));
		// If rotation is valid, undraw current shape before executing rotation.

		for (var layer = 0; layer < layerCount; layer++) {
			// Loop from first element in layer PER SIDE (so left, top, right and bottom) to last element.
			for (var i = 0; i < lastElIndex - firstElIndex; i++) {
				// Get element values

				var currTop = this.shape[firstElIndex][firstElIndex + i];
				var currRight = this.shape[firstElIndex + i][lastElIndex];
				var currBottom = this.shape[lastElIndex][lastElIndex - i];
				var currLeft = this.shape[lastElIndex - i][firstElIndex];

				potentialShape[firstElIndex][firstElIndex + i] = currLeft;
				potentialShape[firstElIndex + i][lastElIndex] = currTop;
				potentialShape[lastElIndex][lastElIndex - i] = currRight;
				potentialShape[lastElIndex - i][firstElIndex] = currBottom;
			}
			firstElIndex++;
			lastElIndex--;
		}

		// Test shape
		if (this.grid.testRotation(potentialShape)) {
			this.grid.undrawShape(this.shape);
			this.shape = potentialShape;
			this.grid.drawShape(this.shape);
		}
	},

	drop: function () {
		if (this.dropStart === 0) {
			this.dropStart = new Date().getTime();
		}

		if (new Date().getTime() - this.dropStart > this.defaultConfig.DROP_SPEED) {
			this.move("down");
			this.dropStart = 0;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Tetromino);

/***/ })
/******/ ]);