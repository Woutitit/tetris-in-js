var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: './src/js/app.js',
	output: {
		path: __dirname + '/dist',
		filename: 'app.js'
	},
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
        { test: /\.js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader' }},
        { test: /\.css$/, use: ExtractTextPlugin.extract({ use: { loader: 'css-loader' }, fallback: "style-loader" })},
        ]
    },
    plugins: [ new ExtractTextPlugin('app.css') ]
};