const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'source-map',
    watch: true,
    mode: "development",
    output: {
        filename: 'bundle.[name].js',
        publicPath: 'http://localhost:3001/arquivos/',
        path: path.resolve(__dirname, 'arquivos')
    },
    devServer: {
        host: 'localhost',
        port: 3001,
        https: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ]
});