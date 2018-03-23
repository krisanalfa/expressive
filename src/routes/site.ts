import { Router } from 'express'
import { uses } from './../lib/helpers'
import { SiteController } from '../controllers/SiteController'

const siteRouter = Router()

siteRouter.get('/', uses<SiteController>('SiteController@index'))

export default siteRouter
