/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const APP_BUILD_DIR = path.resolve('build');
const APP_SRC_DIR = path.resolve(__dirname, 'src');

const OUTPUT_CONFIG = {
    path: APP_BUILD_DIR,
};

const TS_LOADER_RULE = {
    test: /\.tsx?$/,
    exclude: [/node_modules/, /build/],
    include: [APP_SRC_DIR],
    loader: 'ts-loader',
};

const APP_CONFIG = {
    target: 'node',
    devtool: 'source-map',
    entry: {
        'app': ['./src/index.ts']
    },
    resolve: {
        extensions: ['.ts', '.d.ts', '.tsx', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    plugins: [
    ],
    output: OUTPUT_CONFIG,
    module: { rules: [TS_LOADER_RULE] },
    externals: [webpackNodeExternals()],
    optimization: {
        nodeEnv: false,
    },
};

module.exports = APP_CONFIG;
