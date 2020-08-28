const path = require('path');

// Плагин для работы с HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Плагин для чистки от неиспользуемых файлов
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Плагин для префиксов
const autoprefixer = require('autoprefixer');

// Копирование
const CopyPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	// Точка входа
	entry: './src/global/index.js',

	// Точка выхода
	output: {
		// Смена имени по-умолчанию
		filename: '[name].bundle.js',
		// Куда сохранять
		path: path.resolve(__dirname, 'dist'),
	},

	// Сервак, отслеживающий изменения в выбранном каталоге
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true,
		port: 9000
	},

	// Модули
	module: {
		//Правила
		rules: [
			// Шаблонизатор handlebars
			{test: /\.handlebars$/, loader: 'handlebars-loader'},

			{
				test: /\.(sass|scss|css)$/,
				use: [
					// 'style-loader',
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								autoprefixer({
									overrideBrowserslist:  ['last 4 versions'],
								})
							],
						},
					},
					"sass-loader"
				]
			},

			{
				// Загрузка изоражений и шрифтов
				test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: '[contenthash].[ext]',
							outputPath: 'assets/',
						}
					}
				]
			},

			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/pages/index.handlebars'
		}),

		new CopyPlugin([
			{ from: './src/assets/images/', to: './assets/' },
		]),

		new MiniCssExtractPlugin({
			filename: "[contenthash].css",
		}),

		new CleanWebpackPlugin(),
	]
};
