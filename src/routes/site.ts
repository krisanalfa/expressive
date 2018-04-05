import { Router } from 'express'
import { uses } from './../lib/helpers'
import { SiteController } from '../controllers/SiteController'

const router = Router()

router.get('/', uses<SiteController>('SiteController@index'))

export default router
