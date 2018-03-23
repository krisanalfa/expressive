import 'reflect-metadata'
import { injectable } from 'inversify'
import { Request, Response } from 'express'

@injectable()
export class SiteController {
  public async index (_: Request, { render }: Response) {
    render('site.index')
  }
}
