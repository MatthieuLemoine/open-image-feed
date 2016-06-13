const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack           = require('webpack');

module.exports = {
  entry  : './src/front/app/app.jsx',
  output : {
    path     : `${__dirname}/dist`,
    filename : 'bundle.js'
  },
  module : {
    loaders : [
      {
        test   : /\.css$/,
        loader : ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        )
      },
      {
        test    : /\.jsx$/,
        loader  : 'jsx-loader?insertPragma=React.DOM&harmony',
        exclude : /node_modules/
      },
      {
        test    : /\.jsx$/,
        loader  : 'babel-loader',
        query   : {
          presets : [
            'es2015',
            'react'
          ]
        },
        exclude : /node_modules/
      },
      {
        test   : /\.(woff|woff2)(\?v =\d+\.\d+\.\d+)?$/,
        loader : 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test   : /\.ttf(\?v =\d+\.\d+\.\d+)?$/,
        loader : 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test   : /\.eot(\?v =\d+\.\d+\.\d+)?$/,
        loader : 'file'
      },
      {
        test   : /\.svg(\?v =\d+\.\d+\.\d+)?$/,
        loader : 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : 'src/front/app/index.html',
      inject   : true
    }),
    new webpack.ProvidePlugin({
      React : 'react'
    }),
    new ExtractTextPlugin('[name].css')
  ]
};
