const path = require('path')
const { merge } = require('webpack-merge')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const config = require('./webpack.config')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(config, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [
                    'imagemin-gifsicle',
                    'imagemin-mozjpeg',
                    'imagemin-pngquant',
                    'imagemin-svgo',
                  ],
                },
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'esnext',
        css: true,
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
            ],
          },
        },
      }),
    ],
  },
})
