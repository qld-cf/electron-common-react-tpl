'use strict';

const path = require('path');
const pkg = require('../package.json')
// const TerserPlugin = require('terser-webpack-plugin');
// const paths = require('./paths');
// const modules = require('./modules');

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function (webpackEnv) {
  return {
    mode: 'production',
    target: 'electron-main',
    entry: path.join(__dirname, '../electron/index.js'),
    output: {
      path: path.join(__dirname, '../electron'),
      filename: 'build.js'
    },
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node-modules/
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
      ]
    }
  };
};
