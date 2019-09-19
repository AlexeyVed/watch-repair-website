const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    open: true,
    inline: true,
    hot: true,
    liveReload: true,
    publicPath: '/',
    proxy: {
      '/api': 'http://localhost:4000'
    },
    historyApiFallback: true
  },
  optimization: {
    nodeEnv: 'development'
  }
})
