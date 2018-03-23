import { join } from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '..', '.env') })

import './instances/sequelize'
import * as logger from 'morgan'
import { Router } from './routes'
import * as express from 'express'
import { View } from './services/View'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'

export const app = express()

app
  .use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'short'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(join(__dirname, '..', 'public')))
  .set('views', join(__dirname, '..', 'views'))
  .use(View.edge())
  .use(Router.all())
  .use(compression())

if (process.env.NODE_ENV === 'development') {
  app.use(require('errorhandler')())

  const webpack = require('webpack')
  const webpackConfig = require('./../webpack.dev.js')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}
