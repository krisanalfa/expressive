import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '..', '.env') })

import * as logger from 'morgan'
import { Router } from './routes'
import * as express from 'express'
import { View } from './services/View'
import * as compression from 'compression'

export const app = express()

app.set('views', path.join(__dirname, '..', 'views'))

app
  .use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))
  .use(compression())
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use(View.initialize())
  .use(Router.register())

if (process.env.NODE_ENV !== 'production') {
  app.use(require('errorhandler')())

  const webpack = require('webpack')
  const webpackConfig = require('./../webpack.dev.js')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}
