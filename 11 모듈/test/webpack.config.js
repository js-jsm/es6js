
const
  webpack = require("webpack"),
  path = require('path');

module.exports = {
  watch: true,
  context: __dirname,
  entry: {
    "app": './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: path.resolve(__dirname, '/'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel',
        query: {
  	  presets: ['es2015', 'stage-0']
  	}
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  devServer: {
    port: 3000,
    contentBase: './build',
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  devtool: '#inline-source-map',
  debug: true
}
