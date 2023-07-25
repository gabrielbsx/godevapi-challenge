import { type Contact } from '@core/domain/entity/contact'

export interface ContactStorageService {
  getContacts: (sheetId?: string) => Promise<Contact[]>
  saveContacts: (contacts: Contact[]) => Promise<void>
}
