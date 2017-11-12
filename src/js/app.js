import Vue from "vue"; //Webpack alias for vue/dist/vue.js

// Dumb components
Vue.component("v-panel", require("./components/Panel.vue").default);

// Smart components
Vue.component("v-game", require("./components/Game.vue").default);
Vue.component("v-canvas", require("./components/Canvas.vue").default);
Vue.component("v-score-panel", require("./components/ScorePanel.vue").default);
Vue.component("v-lines-panel", require("./components/LinesPanel.vue").default);

var app = new Vue({
	el: "#app"
});

