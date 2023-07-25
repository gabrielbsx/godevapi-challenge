import { type Controller } from '@core/presentation/contract/controller'
import { type Request, type Response } from 'express'

export class ExpressControllerAdapter {
  static adapt (controller: Controller) {
    return async (req: Request, res: Response) => {
      try {
        const httpRequest = {
          body: req.body,
          headers: req.headers,
          params: req.params,
          query: req.query
        }
        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.status).json(httpResponse.body)
      } catch (error) {
        res.status(500).json({
          error: 'Internal server error'
        })
      }
    }
  }
}
