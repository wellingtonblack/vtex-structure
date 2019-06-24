const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('../webpack.common');

module.exports = merge(common, {
    entry: {
        website: path.resolve(__dirname, 'app.tsx')
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'assets/images/'),
            to: "./images"
        }]),
        new CleanWebpackPlugin([path.resolve(__dirname, 'arquivos')]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'service-worker.js'),
            to: "./"
        }]),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'manifest.json'),
            to: "./"
        }]),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'assets/icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'arquivos/sprite-website.png'),
                css: path.resolve(__dirname, 'routes/shared/sprites.scss')
            },
            apiOptions: {
                cssImageRef: "/arquivos/sprite-website.png"
            },
            spritesmithOptions: {
                algorithm: "alt-diagonal"
            }
        }),
    ]
});

