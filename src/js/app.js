import Player from "./player.js";

(function() {
	var TICK_LENGTH = 50; // Will make our game update at a rate of 20Hz (= 20 updates per second).
	var TICK_RATE = 1000 / TICK_LENGTH; // Also called update rate.
	var ALLOWED_EVENT_CODES = {
		"ArrowUp": "up",
		"ArrowRight": "right",
		"ArrowDown": "down",
		"ArrowLeft": "left"
	};
	
	var lastFrameTimeStamp = performance.now();
	var delta = 0; // Records how much realtime the game's behind since last game logic update. Also known as lag.
	var player = new Player();


	/**
	* Setup basics before main loop runs.
	*/
	function init() {
		startListening();
		requestAnimationFrame(main);
	};


	/**
	* Main game loop.
	* @param {Number} timeStamp - Holds a timestamp of when this function is called.
	*/
	function main(timeStamp) {
		// Gets called first to ensure the browser receives the request for the next frame in time.
		requestAnimationFrame(main); 

		var lastFrameDuration = timeStamp - lastFrameTimeStamp;
		lastFrameTimeStamp = timeStamp; // Override lastFrameTimeStamp with current one.

		delta += lastFrameDuration;

		// TODO: Add bail function for when the amount of updates to process (= workload) gets too much.
		while(delta >= TICK_RATE) {
			update(); // Update game logic.
			// So what we do is process the user inputs and put some controls on true.
			// So with the events we simply record which keys are presseda and set flags for them.
			// For example if you hit the left arrow button you might put "leftArrow = true".
			// In your update loop you would then check if (leftArrow) moveLeft();
			// Then we call update in which we will call for example updateTetromino() (or tetromino.update()) if we're currently playing.
			// In this updateTetromino() function we will then check for each possible "Tetromino.input" if they are on true. if so we should move those
			// positions.
			delta -= TICK_RATE;
		}
	};


	/**
	* Update game logic.
	*/
	function update() {
		// Update game logic.
	};


	/**
	* Render game graphics.
	*/
	function render() {
		// Render graphics.
	};


	/**
	* Listen to relevant events.
	*/
	function startListening() {
		document.addEventListener('keydown', () => onKey(event));
		document.addEventListener('keyup', () => onKey(event));
	}


	/**
	* Handle keyboard key events.
	* @param {Event} event.
	*/
	function onKey(event) {
		player.handleInput(ALLOWED_EVENT_CODES[event.code]);
	};

	init();
})();