import 'reflect-metadata'
import { injectable } from 'inversify'
import { Request, Response, NextFunction } from 'express'

@injectable()
export class SiteController {
  public async index (_: Request, res: Response, __: NextFunction) {
    res.render('site.index')
  }
}
