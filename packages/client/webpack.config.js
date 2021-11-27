const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist', 'client'),
    publicPath: '/',
    filename: 'client.bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.js'],
    modules: [path.join('..', '..', 'node_modules')],
  },
  target: 'web',
  devServer: {
    static: path.join(__dirname, 'src'),
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPlugin({
      template: path.join('index.html'),
    }),
  ],
};
