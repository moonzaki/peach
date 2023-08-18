const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './../src/assets/js/index.js'),
    output: {
        path: path.resolve(__dirname, './../dist/'),
        filename: 'assets/js/bundle.js',
        clean: true,
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split("/")
                .slice(1)
                .join("/");
            return `${filepath}/[name][ext]`;

        },
    },
    resolve: {
        alias: {
            common: path.resolve(__dirname, './../src/assets/sass/common/'),
            components: path.resolve(__dirname, './../src/assets/sass/components/'),
        },
        extensions: [
            ".sass",
            ".scss",
            ".css",
            ".wasm",
            ".web.js",
            ".mjs",
            ".js",
            ".json",
            ".web.jsx",
            ".jsx"
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            minify: false
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(eot|ttf|otf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico|webp)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(mp4$|ogv)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ],
    },
};