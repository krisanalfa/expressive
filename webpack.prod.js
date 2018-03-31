const path = require('path')
const glob = require('glob-all')
const webpack = require('webpack')
const cssnano = require('cssnano')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const PurifyCSSPlugin = require('purifycss-webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let prodConfig = merge(config, {
  devtool: false,
  output: {
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader', options: { remove: false } },
            { loader: 'sass-loader' }
          ]
        })
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /(node_modules|__vendor__)/,
          name: 'vendor',
          chunks: 'initial',
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
    new ExtractTextPlugin('css/[name].[hash:8].css'),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync([
        path.join(__dirname, 'views/**/*.edge'),
        path.join(__dirname, 'client/components/**/*.vue')
      ]),
    }),
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
    new ManifestPlugin()
  ],
  performance: {
    hints: false
  }
})

// If not running under CI
if (!process.env.CI_BUILD) {
  prodConfig = merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin({ openAnalyzer: false }),
    ]
  })
} else { // If run under CI
  prodConfig = merge(prodConfig, {
    stats: 'none'
  })
}

module.exports = prodConfig
