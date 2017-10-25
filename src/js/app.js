import Vue from "vue";
import Game from "./game/game.js";
import NN from "./neural_network.js";
import Agent from "./agent.js";

var app = new Vue({
	el: "#app",
	data: function() {
		return {
			game: null,
			agent: null
		}
	},
	mounted: function() {
		this.game = new Game(document.getElementById("canvasOuterContainer")); //TODO: Add a singleton?
		this.game.init();

		this.agent = new Agent(this.game);
	},
	methods: {
		startSession: function() {
			this.game.start();
			this.agent.start(); //Start training of agent
		}
	}
});
