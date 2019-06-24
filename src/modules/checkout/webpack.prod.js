const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');


module.exports = merge(common, {
    mode: "production",
    output: {
        filename: `[name]5-custom.js`,
        publicPath: '/arquivos/',
        path: path.resolve(__dirname, 'arquivos')
    },
    plugins: [
        new UglifyJSPlugin({
            warningsFilter: (src) => true,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                },
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ImageminPlugin({
            minFileSize: 9000,
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 9,
                quality: 60
            },
            pngquant: {
                quality: 60,
                speed: 10
            },
            plugins: [
                imageminMozjpeg({
                    quality: 80,
                    progressive: true
                })
            ]
        }),
    ]
});