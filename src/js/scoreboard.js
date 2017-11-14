function Scoreboard() {
	this.score = 0;
	this.lineCount = 0;
}


Scoreboard.prototype = {
	updateLineCountAndScore: function(lines) {
		this.lineCount += lines;
		this.score += 500;

		this.updateView();
	},


	updateView: function() {
		document.getElementById("score").innerHTML = this.score;
		document.getElementById("lineCount").innerHTML = this.lineCount;
	}
}

export default Scoreboard;