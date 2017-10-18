// With jslintrc we can configure jslint like which version of JS it should check etc.
// Also, automate the jslint in some way everytime our .js file changes?
var game = {
	start : function() {
		var mycanvas = document.createElement("canvas");
		mycanvas.id = "mycanvas";
		document.body.appendChild(mycanvas);
	},
};

game.start();
