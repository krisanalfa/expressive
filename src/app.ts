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

logger.token('ip', (req, _, __) => {
  const ips = req.headers['x-forwarded-for']
  const ip = (ips instanceof Array) ? ips.shift() : (
    (typeof ips === 'string') ? ips.split(',').shift() : undefined
  )

  return ip || req.ip ||
    (req.connection && req.connection.remoteAddress) ||
    ''
})

logger.token('custom-referrer', (req, _, __) => {
  let referer = req.headers['referer'] || req.headers['referrer']

  if (referer instanceof Array) referer = referer.shift()

  return (referer === '-') ? 'N/A' : (referer || 'N/A')
})

app
  .use(logger(':ip - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":custom-referrer" ":user-agent"', {
    skip: (req: express.Request, _) => req.headers['user-agent'] === 'ELB-HealthChecker/2.0'
  }))
  .use(View.initialize())
  .use(Router.register())
  .use(compression())
  .use(express.static(path.join(__dirname, '..', 'public')))

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
