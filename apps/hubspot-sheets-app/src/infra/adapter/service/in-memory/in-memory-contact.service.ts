import { type Contact } from '@core/domain/entity/contact'
import { type ContactStorageService } from '@core/application/port/contact-storage-service'

export class InMemoryContactService implements ContactStorageService {
  private readonly contacts: Contact[] = []

  public async getContacts (): Promise<Contact[]> {
    return this.contacts
  }

  public async saveContacts (contacts: Contact[]): Promise<void> {
    this.contacts.push(...contacts)
  }
}
