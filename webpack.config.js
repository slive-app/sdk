var path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: './slive.js',
  output: {
    path: path.resolve(__dirname),
    filename: '_sliveBundle.js',
    library: 'SLIVE',
    libraryTarget: 'var',
  }
};