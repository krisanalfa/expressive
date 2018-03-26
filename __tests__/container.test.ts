import { container } from './../src/instances/container'
import { SiteController } from './../src/controllers/SiteController'

describe('Container', () => {
  test('Can resolve controller', () => {
    const controller: any = container.get('SiteController')

    expect(controller instanceof SiteController).toBe(true)
  })
})
