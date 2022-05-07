const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/app.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.(png|jpg|jpeg|svg)$/, type: 'asset/resource'},
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'To Do List',
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/template.html')
    })],
}