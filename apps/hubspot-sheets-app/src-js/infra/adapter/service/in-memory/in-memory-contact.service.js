/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = class InMemoryContactService {
  contacts = []

  async getContacts () {
    return this.contacts
  }

  async saveContacts (contacts) {
    this.contacts.push(...contacts)
  }
}
