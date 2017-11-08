import Vue from "vue"; //Webpack alias for vue/dist/vue.js

Vue.component("v-game", require("./components/Game.vue").default);
Vue.component("v-canvas", require("./components/Canvas.vue").default);

var app = new Vue({
	el: "#app"
});

