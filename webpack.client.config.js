"use strict";

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const path = require("path");
const baseWebpackConfig = require("./webpack.config");

module.exports = Object.assign({}, baseWebpackConfig, {
    entry: {
        app: [
            path.resolve(__dirname, "src/clientApp.tsx"),
            path.resolve(__dirname, "src/app.less"),
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    plugins: [
        ...baseWebpackConfig.plugins,
        new WebpackBuildNotifierPlugin({
            title: "Momo Tabs Build - Client",
        }),
        new CopyWebpackPlugin([ { from: "src/assets", to: "assets" }, "src/static/robots.txt" ]),
        new webpack.DefinePlugin({
            __SERVER__: false
        })
    ],
});
