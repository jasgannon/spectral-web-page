const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  resolve: {
    fallback: {
      fs: false, // Correct for ignoring 'fs'
      path: require.resolve("path-browserify"), // Correct for providing a fallback for 'path'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Correct for extracting CSS into separate files
    }),
  ],
  module: {
    rules: [
      {
        test: /\.yaml$/,
        type: "asset/source", // Consider removing if you no longer need to handle YAML files
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Correct for CSS handling
      },
      // Add other rules as needed
    ],
  },
};
