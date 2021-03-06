const path = require('path');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
	mode: 'none', // i.e. not production or development (see: https://webpack.js.org/configuration/mode).
	target: 'node',
	node: {
		__dirname: false
	},
	externals: [nodeExternals()],
	entry: './src/server/app.js',
	output: {
		path: path.join(__dirname, 'built'),
		filename: 'main.js'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										node: '14'
									}
								}
							],
							'@babel/preset-react'
						]
					}
				}
			}
		]
	},
	plugins: [
		new FaviconsWebpackPlugin({
			logo: './src/client/assets/favicon.ico'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: ['node_modules'],
		descriptionFiles: ['package.json']
	}
};

const clientConfig = {
	mode: 'none', // i.e. not production or development (see: https://webpack.js.org/configuration/mode).
	entry: [
		'./src/client/stylesheets/index.scss',
		'./src/react/client-mount.jsx'
	],
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: 'main.js'
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										node: '14'
									}
								}
							],
							'@babel/preset-react'
						]
					}
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

module.exports = [
	serverConfig,
	clientConfig
];
