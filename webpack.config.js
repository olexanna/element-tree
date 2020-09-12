const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
	entry: "./source/main.js",
	watch: true,
	watchOptions: {
		aggregateTimeout: 50,
		poll: 50
	},
	output: {
		path: path.join(__dirname, "./"),
		filename: "index-bundle.js"
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader" ]
			},
			{
				test: /\.scss$/,
				use: [ "style-loader", "css-loader", "sass-loader" ]
			}
		]
	},
	resolve: {
		alias: {
			"@styles": path.resolve( __dirname, "assets/styles" ),
			"@components": path.resolve( __dirname, "source/components" ),
			"@utility": path.resolve( __dirname, "source/utility" ),
		}
	},
	devServer: {
		hot: false,
		inline: false
	}
};