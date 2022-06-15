const path = require('path');
const webpack = require('webpack');
const webpackPageCommon = require('./webpack.page.common');
const { merge } = require('webpack-merge');
const { webpackStdout } = require('../utils/common');

const outputPath = path.join(__dirname, '../../', 'dist/client')

function webpackPageClient(entryObj) {
  const config = merge(webpackPageCommon, {
    entry: entryObj,
  }, {
    target: 'web',
    output: {
      filename: '[name]/index.js',
      path: outputPath,
      publicPath: '',
      clean: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.IS_CLIENT': JSON.stringify(true),
        'process.env.IS_SERVER': JSON.stringify(false),
      }),
    ],
  });
  webpack(config, (err, stats) => {
    webpackStdout(err, stats, {
      name: 'webpack.page.client'
    })
  })
}

module.exports = webpackPageClient;