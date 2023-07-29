const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { DefinePlugin } = require('webpack');
const gitCommitInfo = require('git-commit-info');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const fileConfig = path.join(__dirname, `${process.env.NODE_CONF}.env`);
require('dotenv').config({
    path: fileConfig,
});

const DEVELOPMENT = process.env.NODE_ENV !== 'production';
const SHARE_HOST = process.env.SHARE_HOST === 'true';
const PRODUCTION = process.env.NODE_ENV === 'production';
const HOST = SHARE_HOST ? '0.0.0.0' : 'localhost';
const MAIN_FILE = process.env.MAIN_FILE || 'index';
const DISTRIBUTIVE_DIR = process.env.DISTRIBUTIVE_DIR;

const ifDefLoaderOptions = {
    DEVELOPMENT,
    PRODUCTION,
};

const plugins = [
    new Dotenv({
        path: fileConfig,
        systemvars: true,
    }),
    new CleanWebpackPlugin(),
    new DefinePlugin({
        COMMIT_INFO: JSON.stringify(gitCommitInfo()),
    }),
    new HtmlWebpackPlugin({
        hash: true,
        template: `src/${MAIN_FILE}.html`,
        meta: {
            viewport:
                'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
        },
    }),
    new CopyPlugin({
        patterns: [{ from: 'src/assets', to: 'assets' }],
    }),
];
const minimizer = [new JsonMinimizerPlugin()];
if (PRODUCTION) {
    minimizer.push(new TerserPlugin());
}

module.exports = {
    entry: {
        game: `./src/${MAIN_FILE}.ts`,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    plugins,
    mode: DEVELOPMENT ? 'development' : 'production',
    devtool: DEVELOPMENT ? 'source-map' : false,
    devServer: {
        // contentBase: outputDir,
        compress: DEVELOPMENT ? false : true,
        // inline: true,
        host: HOST,
        port: 8080,
        hot: true,
        allowedHosts: ['all'],
        historyApiFallback: {
            index: 'index.html',
        },
    },
    optimization: {
        minimize: PRODUCTION ? true : false,
        minimizer: minimizer,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ifdef-loader',
                        options: ifDefLoaderOptions,
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, DISTRIBUTIVE_DIR),
        clean: true,
    },
};
