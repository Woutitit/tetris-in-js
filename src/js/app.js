import Vue from "vue"; //Webpack alias for vue/dist/vue.js
import components from "./components/bootstrap.js";

var app = new Vue({
	el: "#app",
	components
});

