const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './renderer.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[fullhash:8].js',
        clean: true,
    },
    target: 'electron-renderer',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.css|less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico',
        }),
    ],
};
