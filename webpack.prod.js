const path = require('path')
const glob = require('glob-all')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
            { loader: 'css-loader', options: { minimize: true } },
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
            { loader: 'css-loader', options: { minimize: true } },
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
        commons: {
          test: /(node_modules|vendor)/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    extractTextVendor,
    extractText,
    new ManifestPlugin()
  ]
})
