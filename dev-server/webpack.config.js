const webpack = require('webpack');

const HOST      = 'localhost';
const PORT      = 8080;
const ROOT_PATH = __dirname;
const SRC_PATH  = `${ROOT_PATH}/src/`;

module.exports = {
    entry: './src/index.js',

    devtool: 'source-map',
    cache: true,
    debug: true,

    contentBase: SRC_PATH,

    output: {
        path: SRC_PATH,
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel']
            }
        ]
    },
    watch: true,
    progress: true,
    devServer: {
        host: HOST,
        port: PORT,
        contentBase: SRC_PATH,
        inline: true
    }
};