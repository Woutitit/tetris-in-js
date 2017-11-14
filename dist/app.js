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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_js__ = __webpack_require__(2);


function Game() {
	this.before = 0;
	this.tickRate = 50; // Will set the update/refresh rate to run at 20 Hz. So 20 game logic updates per second (1s / 50 = 1000ms / 50 = 20).
	this.updateRate = 1000 / this.tickRate;
	this.lag = 0;

	this.gameLoop();
};

Game.prototype = {
	gameLoop: function () {

		var now = performance.now();
		var lastFrameDuration = now - this.before;

		this.lag += lastFrameDuration;

		while (this.lag >= this.updateRate) {
			__WEBPACK_IMPORTED_MODULE_0__engine_js__["a" /* default */].update(); // Update game logic.
			this.lag -= this.updateRate;
		}

		__WEBPACK_IMPORTED_MODULE_0__engine_js__["a" /* default */].render(); // Render as much as we can.

		this.before = now; // Make current time "before" to benchmark this in next frame.
		requestAnimationFrame(this.gameLoop.bind(this));
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// an Engine can be an object literal since each game will only ever use one
var Engine = {
	update: function () {
		// Update physics.
	},

	render: function () {
		// Render entities.
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Engine);

/***/ })
/******/ ]);