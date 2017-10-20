import Vue from "vue";
import Game from "./game.js";
import NN from "./neural_network.js";
import Agent from "./agent.js";

// Import components
import VGameArea from "./components/VGameArea.vue";

var app = new Vue({
	el: "#app",
	components: {
		"v-game-area": VGameArea
	},
	mounted: function() {
		Game.init();
	},
	methods: {
		startSession() {
			Agent.train()
		}
	}
});
