import { container } from './../instances/container'
import { Request, Response, NextFunction } from 'express'

export const uses = <TController extends any>(signature: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [Controller, method] = signature.split('@')
      const controller = container.get<TController>(Controller)
      const controllerMethod = controller[method]

      await controllerMethod.apply(controller, [req, res, next])
    } catch (error) {
      next(error)
    }
  }
}
