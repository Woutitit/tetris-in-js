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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_js__ = __webpack_require__(1);


(function () {
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
	var player = new __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* default */]();

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
		while (delta >= TICK_RATE) {
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Player() {}

Player.prototype = {
	handleInput: function (keyPressed) {
		switch (keyPressed) {
			case "left":
			// this.grid.moveTetromino
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ })
/******/ ]);