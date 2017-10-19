import Game from "./game.js";
import NN from "./neural_network.js";

var agent = {
	epochs: 100,
	train() {
		Game.init();
	}
}

export default agent;