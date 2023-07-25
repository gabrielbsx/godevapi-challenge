import { type Controller } from '@core/presentation/contract/controller'

export class CommanderControllerAdapter {
  static adapt (controller: Controller) {
    return async (args: any) => {
      const cliResponse = await controller.handle(args)
      return cliResponse.body
    }
  }
}
