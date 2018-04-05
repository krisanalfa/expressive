import * as fs from 'fs'
import { app } from './app'
import * as http from 'http'
import * as https from 'https'
import { debug } from './instances/debug'

const port = process.env.PORT || 3000
http
  .createServer(app)
  .listen({ port }, (error: any) => {
    if (error) {
      debug('Cannot start app: %O', error)
      process.exit(1)
    }

    debug('Expressive listening at http://localhost:%s', port)
  })

const useSSL = process.env.ENABLE_SSL || false

if (useSSL) {
  const sslPort = process.env.SSL_PORT || 3001
  const keyPath = process.env.SSL_KEY || ''
  const certPath = process.env.SSL_CERT || ''

  https.createServer({
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  }, app)
    .listen({ port: sslPort }, (error: any) => {
      if (error) {
        debug('Cannot start app: %O', error)
        process.exit(1)
      }

      debug('Expressive listening at https://localhost:%s', sslPort)
    })
}
