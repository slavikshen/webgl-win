const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebPackExternalsPlugin = require('html-webpack-externals-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

var common = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.styl$/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: "stylus-loader" // compiles Stylus to CSS
					}
				]
			}
		]
	},
	resolve: {
		modules: [
			path.join(__dirname, "build"),
			"node_modules"
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
		
	],
	externals: {
		// jquery: 'jQuery',
		react: "React",
		"react-dom": "ReactDOM",
	}
};


if( process.env.WEBPACK_MODE === 'production' ) {
	// production 
	module.exports = merge( common, {
		plugins: [
			new HtmlWebPackExternalsPlugin({
				externals: [
					{
						module: 'react',
						entry: 'umd/react.production.min.js',
						global: 'React',
						// files: 'index.html',
					},
					{
						module: 'react-dom',
						entry: 'umd/react-dom.production.min.js',
						global: 'ReactDOM',
						// files: 'index.html',
					},
					{
						module: 'pixi.js',
						entry: 'dist/pixi.min.js',
						global: 'PIXI',
						// files: 'index.html',
					},
				],
				hash: true,
			}),
			new webpack.HotModuleReplacementPlugin()
		]
	});
} else {
	module.exports = merge( common, {
		devtool: 'inline-source-map',
		devServer: {
		contentBase: './dist',
			hot: true
		},
		plugins: [
			new HtmlWebPackExternalsPlugin({
				externals: [
					{
						module: 'react',
						entry: 'umd/react.development.js',
						global: 'React',
						// files: 'index.html'
					},
					{
						module: 'react-dom',
						entry: 'umd/react-dom.development.js',
						global: 'ReactDOM',
						// files: 'index.html'
					},
					{
						module: 'pixi.js',
						entry: 'dist/pixi.js',
						global: 'PIXI',
						// files: 'index.html',
					},
				],
			})
		]
	});
}
