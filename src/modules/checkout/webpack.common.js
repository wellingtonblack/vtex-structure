const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('../webpack.common');

module.exports = merge(common, {
    entry: {
        checkout: path.resolve(__dirname, 'app.tsx')
    },
    plugins: [
        // new CopyWebpackPlugin([{
        //     from: path.resolve(__dirname, 'assets/images/'),
        //     to: "./images"
        // }]),
        new CleanWebpackPlugin([path.resolve(__dirname, 'arquivos')]),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'assets/icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'arquivos/sprite-checkout.png'),
                css: path.resolve(__dirname, 'pages/shared/sprites.scss')
            },
            apiOptions: {
                cssImageRef: "/arquivos/sprite-checkout.png"
            },
            spritesmithOptions: {
                algorithm: "alt-diagonal"
            }
        }),
    ]
});

