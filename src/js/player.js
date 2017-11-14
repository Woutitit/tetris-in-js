function Player() {

}

Player.prototype = {
	handleInput: function(keyPressed) {
		switch (keyPressed) {
			case "left":
			console.log("Go left!");
		}
	}
}

export default Player;