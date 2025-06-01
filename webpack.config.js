const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // або 'production' для продакшену
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // очищає dist перед білдом
    },
    devtool: 'inline-source-map', // зручно для відладки
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'], // дозволяє імпорт без .ts
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // файл-шаблон
        }),
    ],
    devServer: {
        static: './dist',
        open: false,
        hot: true,
        port: 3000,
    },
};
