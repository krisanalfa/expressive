const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  entry: './client/main.ts',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery/dist/jquery.slim',
      jQuery: 'jquery/dist/jquery.slim',
      'window.$': 'jquery/dist/jquery.slim',
      'window.jQuery': 'jquery/dist/jquery.slim',
      Popper: ['popper.js', 'default']
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development'
    })
  ],
  performance: {
    hints: false
  }
}
