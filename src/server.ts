import { app } from './app'
import * as http from 'http'
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
