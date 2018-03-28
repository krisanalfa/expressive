const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const RemoveServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin')

module.exports = merge(config, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: ['./client/main.ts', 'webpack-hot-middleware/client'],
    'pages/index': ['./client/pages/index.ts', 'webpack-hot-middleware/client']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:8].[ext]',
              publicPath: '/img',
              outputPath: 'img'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new RemoveServiceWorkerPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
