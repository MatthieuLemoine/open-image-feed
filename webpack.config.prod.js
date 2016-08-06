const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack           = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  bail     : true,
  debug    : false,
  profile  : false,
  pathInfo : false,
  entry  : './src/browser/app.js',
  output : {
    path     : `${__dirname}/dist`,
    filename : 'bundle.js',
    pathInfo : false
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
        test    : /\.(jsx|js)$/,
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
      },
      {
        test    : /\.(jpe?g|png|gif|svg)$/i,
        loaders : [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template : 'src/browser/index.html',
      inject   : true
    }),
    new webpack.ProvidePlugin({
      React         : 'react'
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle : {
        except : ['require', 'export', '$super'],
      },
      compress : {
        warnings     : false,
        sequences    : true,
        dead_code    : true,
        conditionals : true,
        booleans     : true,
        unused       : true,
        if_return    : true,
        join_vars    : true,
        drop_console : false
      },
    }),
    new CompressionPlugin({
      asset     : '[path].gz[query]',
      algorithm : 'gzip',
      test      : /\.js$|\.html$/,
      threshold : 10240,
      minRatio  : 0.8
    })
  ]
};
