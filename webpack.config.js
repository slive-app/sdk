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
    path: path.resolve(__dirname, 'server'),
    filename: '_sliveBundle.js',
    library: 'SLIVE',
    libraryTarget: 'var',
  }
},
{
  entry: './slive.js',
  output: {
    path: path.resolve(__dirname, 'server/client'),
    filename: '_sliveBundle.js',
    library: 'SLIVE',
    libraryTarget: 'var',
  }
}];