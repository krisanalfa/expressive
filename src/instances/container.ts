import { Container } from 'inversify'
import { SiteController } from '../controllers/SiteController'

export const container = new Container()

container.bind<SiteController>('SiteController').to(SiteController).inSingletonScope()
