const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { cwd } = require('../utils/common');
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.resolve(cwd, 'src'),
      pages: path.resolve(cwd, 'src/pages'),
      styles: path.resolve(cwd, 'src/styles'),
      utils: path.resolve(cwd, 'src/utils'),
      common: path.resolve(cwd, 'src/common'),
    }
  },
  // externals: {
  //   react: 'React',
  //   'react-dom/server': 'ReactDOMServer',
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.css'
    }),
  ]
}