const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const appDir = path.join(__dirname, 'app')
const sharedDir = path.join(__dirname, 'shared')
const stylesDir = path.join(__dirname, 'styles')
const nodeDir = path.join(__dirname, 'node_modules')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: [path.join(appDir, 'index.js'), path.join(stylesDir, 'index.scss')],
  resolve: {
    modules: [appDir, nodeDir, sharedDir, stylesDir],
  },
  plugins: [
    new webpack.DefinePlugin({ IS_DEVELOPMENT }),
    new CleanWebpackPlugin(),
    new CopyPlugin({ patterns: [{ from: sharedDir, to: '' }] }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
        },
      },
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|woff2|fnt|webp)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
