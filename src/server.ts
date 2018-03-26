import { app } from './app'
import { debug } from './instances/debug'

const port = process.env.PORT || 3000
export const server = app.listen(port, () => {
  const bound = server.address()

  debug('Expressive listening at http://%s:%s', bound.address, bound.port)
})
