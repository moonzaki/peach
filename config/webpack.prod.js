// const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env"
                                    ],
                                ],
                            },
                        },
                    },
                    // 'group-css-media-queries-loader',
                    "sass-loader",
                ],
            },
        ],
    },
    devtool: 'source-map',
};
