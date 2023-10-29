var path = require('path');
let webpack = require('webpack');

module.exports = [{
  entry: './slive.js',
  output: {
    path: path.resolve(__dirname),
    filename: '_sliveBundle.js',
    library: 'SLIVE',
    libraryTarget: 'var',
  }
},
{
  entry: './slive.js',
  output: {
    path: path.resolve(__dirname, 'overlay'),
    filename: '_sliveBundle.js',
    library: 'SLIVE',
    libraryTarget: 'var',
  }
},
{
  entry: './slive.js',
  output: {
    path: path.resolve(__dirname, 'overlay/module'),
    filename: '_sliveBundle.js',
    library: 'SLIVE',
    libraryTarget: 'var',
  }
}];