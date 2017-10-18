// With jslintrc we can configure jslint like which version of JS it should check etc.
// Also, automate the jslint in some way everytime our .js file changes?
import Vue from "vue";
import VGameArea from "./components/VGameArea.vue"

var app = new Vue({
	el: "#app",
	components: {
		"v-game-area": VGameArea
	},
	methods: {
		startSimulation(gameArea) {
			// Init game and when it's done (in callback) let our bot play it.
			//Init game and let our bot play it
			var gameArea = document.getElementById(gameArea)
			var context = gameArea.getContext("2d");

			this.initGraphs(context);
		},
		initGraphs(context) {
			context.fillRect(0,0,20,20);
		}
	}
});
