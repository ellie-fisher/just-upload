const path    = require ('path');
const webpack = require ('webpack');

const MiniCssExtractPlugin = require ('mini-css-extract-plugin');


const MODE = 'development';

const CLIENT_DIR = path.join (__dirname + '/src/client');
const CONFIG_DIR = path.join (__dirname + '/cfg');


module.exports =
{
	entry: `${CLIENT_DIR}/js/main.js`,

	output:
	{
		filename: 'bundle.js',
		path:     `${CLIENT_DIR}/dist`,
	},

	mode: MODE,

	watchOptions:
	{
		ignored: ['**/node_modules', '**/src/server'],
	},

	plugins:
	[
		new MiniCssExtractPlugin (
		{
			filename: 'styles.css',
		}),
	],

	module:
	{
		rules:
		[
			{
				test:    /\.jsx?$/,
				exclude: /node_modules/,
				loader:  'babel-loader',
			},
			{
				test: /\.s[ca]ss$/,
				exclude: /node_modules/,
				use:
				[
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
						options:
						{
							sourceMap: true,
						},
					},
				],
			},
		],
	},

	resolve:
	{
		alias:
		{
			'~/cfg':    path.resolve (__dirname, `${CONFIG_DIR}/`),
			'~/styles': path.resolve (__dirname, `${CLIENT_DIR}/styles/`),
			'~':        path.resolve (__dirname, `${CLIENT_DIR}/js/`),
		},
	},
};
