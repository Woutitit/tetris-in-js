(function() {
	var COLUMNS = 10;
	var ROWS = 16;
	var SIZE = 20;
	var CELL_DIMENSION = (COLUMNS * SIZE) / COLUMNS;
	var SPAWN_COORDINATES = { x: 3, y: 0 }; // Coordinates correspond to top left value of our shapes matrices.
	var SHAPES = {
		I: [ [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0] ],
		J: [ [2, 0, 0], [2, 2, 2], [0, 0, 0] ],
		L: [ [0, 0, 3], [3, 3, 3], [0, 0, 0] ], 
		O: [ [0, 0, 0, 0], [0, 4, 4, 0],[0, 4, 4, 0], [0, 0, 0, 0] ],
		S: [ [0, 5, 5], [5, 5, 0],[0, 0, 0] ],
		T: [ [0, 6, 0],[6, 6, 6],[0, 0, 0] ],
		Z: [ [7, 7, 0], [0, 7, 7],[0, 0, 0] ]
	};

	var canvas = document.getElementById("tetris");
	var canvasCtx = canvas.getContext("2d");

	canvas.width = COLUMNS * SIZE;
	canvas.height = ROWS * SIZE;

	var currentTetromino = null;

	document.addEventListener("click", () => handleClick(event));
	document.addEventListener("keydown", () => handleKeydown(event));


	function startGame() {
		initGrid();
		runGameLoop();
	};


	function initGrid() {
		grid = Array(ROWS).fill().map(() => Array(COLUMNS).fill(0));
		// TODO: Draw the grid.
	};


	function runGameLoop() {
		if (!currentTetromino) {
			spawnTetromino();
		}

		requestAnimationFrame(runGameLoop);
	};


	function spawnTetromino() {
		currentTetromino = {};
		currentTetromino.shape = getRandomShape();
		currentTetromino.coordinates = SPAWN_COORDINATES;

		drawCurrentTetromino();
	};


	function drawCurrentTetromino() {
		eachBlock(currentTetromino.shape, currentTetromino.coordinates, (x, y, colorValue) => {
			drawCell(x, y, colorValue);
		});
	};


	function drawCell(x, y, colorValue) {
		canvasCtx.fillStyle = "#000";
		canvasCtx.fillRect(x * CELL_DIMENSION, y * CELL_DIMENSION, CELL_DIMENSION, CELL_DIMENSION);
	}


	function eachBlock(shape, topLeft, callback) {
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


	function getRandomShape() { 
		return SHAPES[Object.keys(SHAPES)[Math.floor(Math.random() * Object.keys(SHAPES).length)]];
	};

	function handleKeydown(event) {
		if(event.key === "Enter") {
			startGame();
		}
	};


	function handleClick(event) {

	};
})();

