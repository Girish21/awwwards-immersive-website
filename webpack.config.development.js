const path = require('path')
const { merge } = require('webpack-merge')

const config = require('./webpack.config')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    port: 3001,
  },
  output: {
    path: path.join(__dirname, 'public'),
  },
})
