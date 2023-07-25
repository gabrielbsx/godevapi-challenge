/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = class TransferContactsListUseCaseImpl {
  toContactStorageService
  fromContactStorageService

  constructor (
    toContactStorageService,
    fromContactStorageService
  ) {
    this.toContactStorageService = toContactStorageService
    this.fromContactStorageService = fromContactStorageService
  }

  async execute (input) {
    const contacts = await this.fromContactStorageService.getContacts(input.sheetId)
    await this.toContactStorageService.saveContacts(contacts)
    return true
  }
}
