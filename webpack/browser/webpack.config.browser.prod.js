const webpack           = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const defaultConfig = require('./webpack.config');

module.exports = Object.assign(
  defaultConfig,
  {
    bail     : true,
    debug    : false,
    profile  : false,
    pathInfo : false,
    plugins : [
      new webpack.DefinePlugin({
        'process.env' : {
          NODE_ENV : JSON.stringify('production')
        }
      }),
      ...defaultConfig.plugins,
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
  }
);
