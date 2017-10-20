import Vue from "vue";
import Game from "./game.js";
import NN from "./neural_network.js";
import Agent from "./agent.js";

var app = new Vue({
	el: "#app",
	mounted: function() {
		var game = new Game(document.getElementById("canvasOuterContainer")); //TODO: Add a singleton?
		game.init();
	},
	methods: {
		startSession: function() {
			alert("LOL");
		}
	}
});
