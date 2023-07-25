import { type TransferContactsListUseCase } from '@core/domain/usecase/transfer-contacts-list.usecase'
import { type Controller } from '../contract/controller'
import { type Response, type Request } from '../contract/http'

export class TransferContactsListController implements Controller {
  constructor (private readonly transferContactsListUseCase: TransferContactsListUseCase) {}

  public async handle (request: Request): Promise<Response> {
    const { sheetId } = request.params
    await this.transferContactsListUseCase.execute({ sheetId })
    return {
      status: 200,
      body: 'ok'
    }
  }
}
