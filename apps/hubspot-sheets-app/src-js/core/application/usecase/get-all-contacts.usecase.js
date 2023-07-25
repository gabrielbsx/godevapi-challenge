/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = class GetAllContactsUseCaseImpl {
  contactStorageService

  constructor (contactStorageService) {
    this.contactStorageService = contactStorageService
  }

  async execute () {
    const contacts = await this.contactStorageService.getContacts()
    return { contacts }
  }
}
