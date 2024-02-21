const path = require('path');

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
  }
};
