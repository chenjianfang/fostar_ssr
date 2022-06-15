const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackPageCommon = require('./webpack.page.common');
const { cwd, webpackStdout } = require('../utils/common');

function webpackPageServer(entryObj) {
  const config = merge(webpackPageCommon, {
    entry: entryObj,
  }, {
    target: 'node',
    output: {
      filename: '[name]/index.js',
      path: path.join(cwd, 'dist/server'),
      publicPath: '',
      clean: true,
      library: {
        type: 'commonjs'
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.IS_CLIENT': JSON.stringify(false),
        'process.env.IS_SERVER': JSON.stringify(true),
      }),
      new HtmlWebpackPlugin({
        filename: '[name]/index.html',
        template: 'src/template.ejs',
      }),
    ],
  });
  webpack(config, (err, stats) => {
    webpackStdout(err, stats, {
      name: 'webpack.page.server'
    })
  })
}

module.exports = webpackPageServer;