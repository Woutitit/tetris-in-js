import Vue from "vue";
import Agent from "./agent.js";

// Import components
import VGameArea from "./components/VGameArea.vue";

var app = new Vue({
	el: "#app",
	components: {
		"v-game-area": VGameArea
	},
	methods: {
		startSession() {
			Agent.train()
		}
	}
});
