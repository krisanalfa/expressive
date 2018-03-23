import { app } from './app'
import { debug } from './instances/debug'

export const server = app.listen(3000, () => {
  const bound = server.address()

  debug('Expressive listening at http://%s:%s', bound.address, bound.port)
})
