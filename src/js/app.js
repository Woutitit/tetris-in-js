// With jslintrc we can configure jslint like which version of JS it should check etc.
// Also, automate the jslint in some way everytime our .js file changes?
import Vue from "vue";
import VGameArea from "./components/VGameArea.vue"

var app = new Vue({
  el: "#app",
  components: {
  	"v-game-area": VGameArea
  }
})