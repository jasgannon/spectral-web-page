const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  // Add this to handle the `fs` and `path` modules
  resolve: {
    fallback: {
      "fs": false, // Tells Webpack to ignore fs module
      "path": require.resolve("path-browserify"), // Provides a browser-compatible version of path
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
