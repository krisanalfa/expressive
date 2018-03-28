const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: './client/main.ts',
    'pages/index': './client/pages/index.ts',
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'jquery$': 'jquery/dist/jquery.slim.js'
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
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development'
    })
  ]
}
