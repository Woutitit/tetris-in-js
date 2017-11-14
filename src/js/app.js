(function() {
	var TICK_LENGTH = 50;
	var UPDATE_RATE = 1000 / TICK_LENGTH;
	
	var delta; // Records how much realtime the game's behind. Also known as lag.
	

	/**
	* Main game loop.
	* @param {timeStamp} - Holds a timestamp of when this function is called.
	*/
	function main(timeStamp) {
		requestAnimationFrame(main); // Gets called first to ensure the browser receives the request for the next frame in time.


	};


	/**
	* Update game logic.
	*/
	function update() {

	};


	/**
	* Render game graphics.
	*/
	function render() {

	};

	requestAnimationFrame(main);
})();