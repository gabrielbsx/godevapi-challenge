/* eslint-disable @typescript-eslint/explicit-function-return-type */
export class InMemoryContactService {
  contacts = []

  async getContacts () {
    return this.contacts
  }

  async saveContacts (contacts) {
    this.contacts.push(...contacts)
  }
}
