import { container } from './../instances/container'
import { RequestHandler, Request, Response, NextFunction } from 'express'

export const uses = <TController extends any>(signature: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const [Controller, method] = signature.split('@')

    const controller = container.get<TController>(Controller)
    const controllerMethod: RequestHandler = controller[method]

    await controllerMethod.apply(controller, [ req, res ]).catch(next)
  }
}
