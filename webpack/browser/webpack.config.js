const defaultConfig     = require('../webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign(
  defaultConfig,
  {
    plugins : [
      new HtmlWebpackPlugin({
        template : 'browser/index.html',
        inject   : true
      }),
      ...defaultConfig.plugins
    ]
  }
);
