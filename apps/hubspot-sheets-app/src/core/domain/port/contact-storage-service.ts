import { type Contact } from '@core/domain/entity/contact'

export interface ContactStorageService {
  getContacts: () => Promise<Contact[]>
  saveContacts: (contacts: Contact[]) => Promise<void>
}
