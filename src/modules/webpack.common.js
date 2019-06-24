const path = require('path');

module.exports = {
    entry: {
        common: path.resolve(__dirname, 'common/app.tsx'),
    },
    module: {
        rules: [
            {
                test: /\.lazy\.scss$/,
                use: [
                    {
                        loader: "style-loader/useable"
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: { url: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')(['last 2 versions', '>1%', 'Android >= 3.2', 'iOS 7'])]
                        }
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, './common/utils/variables.scss'),
                                path.resolve(__dirname, './common/utils/mixins.scss'),
                                path.resolve(__dirname, './common/utils/functions.scss')
                            ]
                        },
                    },
                ]
            },

            {
                test: /^(?:(?!lazy).)*\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    "css-loader?modules&url=true&importLoaders=1&localIdentName=vitrio-[name]__[local]___[hash:base64:5]",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')(['last 2 versions', '>1%', 'Android >= 3.2', 'iOS 7'])]
                        }
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, './common/utils/variables.scss'),
                                path.resolve(__dirname, './common/utils/mixins.scss'),
                                path.resolve(__dirname, './common/utils/functions.scss')
                            ]
                        },
                    },
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader?classPrefix'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|gif)$/,
                loader: "file-loader"
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                use: ["ts-loader", "tslint-loader"],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: ["node_modules", "spritesmith-generated"],
        extensions: ['.tsx', '.ts', '.js']
    },
};