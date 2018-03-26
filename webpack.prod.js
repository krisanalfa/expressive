const path = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const extractTextVendor = new ExtractTextPlugin({ filename: 'css/vendor.[hash:8].css' })
const extractText = new ExtractTextPlugin({ filename: 'css/[name].[hash:8].css' })

module.exports = merge(config, {
  devtool: false,
  output: {
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.scss$/,
        use: extractTextVendor.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        }),
        include: /(node_modules|vendor)/
      },
      {
        test: /\.scss$/,
        use: extractText.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        }),
        exclude: /(node_modules|vendor)/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /(node_modules|vendor)/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJSWebpackPlugin({
        sourceMap: false,
        extractComments: { banner: false },
        uglifyOptions: {
          compress: { drop_console: true }
        }
      })
    ],
  },
  plugins: [
    extractTextVendor,
    extractText,
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true
      },
      canPrint: false
    }),
    new ManifestPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})
