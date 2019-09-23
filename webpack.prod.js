const common = require('./webpack.common.js')

module.exports = Object.assign(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  }
})
