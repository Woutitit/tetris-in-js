(function() {
	var COLUMNS = 10;
	var ROWS = 16;
	var SIZE = 20;

	var canvas = document.getElementById("tetris");
	var canvasCtx = canvas.getContext("2d");

	canvas.width = COLUMNS * SIZE;
	canvas.height = ROWS * SIZE;
})();

