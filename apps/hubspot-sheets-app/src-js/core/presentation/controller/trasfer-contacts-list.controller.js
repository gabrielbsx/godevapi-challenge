/* eslint-disable @typescript-eslint/explicit-function-return-type */
export class TransferContactsListController {
  transferContactsListUseCase

  constructor (transferContactsListUseCase) {
    this.transferContactsListUseCase = transferContactsListUseCase
  }

  async handle (request) {
    const { sheetId } = request.params
    await this.transferContactsListUseCase.execute({ sheetId })
    return {
      status: 200,
      body: 'ok'
    }
  }
}
