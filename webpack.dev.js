const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  rules: [
    {
      enforce: 'pre',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }
  ],
  devServer: {
    port: 3000,
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
