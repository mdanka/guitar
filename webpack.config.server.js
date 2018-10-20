"use strict";

const path = require("path");
const url = require("url");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const baseWebpackConfig = require("./webpack.config");

const baseUrl = "/";
const webpackDevServerPort = "8545";

module.exports = Object.assign({}, baseWebpackConfig, {
    entry: [
        ...baseWebpackConfig.entry.app,
        "webpack/hot/dev-server",
        // `${require.resolve("webpack-dev-server/client/")}?http://localhost:${webpackDevServerPort}`,
    ],
    output: Object.assign({}, baseWebpackConfig.output, {
        publicPath: `http://localhost:${webpackDevServerPort}${baseUrl}`,
    }),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...baseWebpackConfig.plugins.filter((plugin) => !(plugin instanceof CopyWebpackPlugin)),
    ],
    devServer: {
        contentBase: path.join(__dirname, "build", "src"),
        historyApiFallback: {
            index: baseUrl,
        },
        https: false,
        hot: true,
        port: webpackDevServerPort,
        publicPath: `http://localhost:${webpackDevServerPort}${baseUrl}`,
        stats: baseWebpackConfig.stats,
    },
});
