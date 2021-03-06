const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'source-map',
    watch: true,
    mode: "development",
    output: {
        filename: `[name]5-custom.js`,
        publicPath: '/arquivos/',
        path: path.resolve(__dirname, 'arquivos')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ]
});