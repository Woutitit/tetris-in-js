(function() {
	var TICK_LENGTH = 50; // Will update at a rate of 20Hz (= 20 updates per second).
	var UPDATE_RATE = 1000 / TICK_LENGTH;
	
	var lastFrameTimeStamp = performance.now();
	var delta = 0; // Records how much realtime the game's behind since last game logic update. Also known as lag.


	/**
	* Setup basics before main loop runs.
	*/
	function init() {
		startListening();
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
		while(delta >= UPDATE_RATE) {
			update(); // Update game logic.
			delta -= UPDATE_RATE;
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


	function onKey(event) {
		console.log(event);
	};

	init();
	window.requestAnimationFrame(main);
})();