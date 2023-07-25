import { type Contact } from '@core/domain/entity/contact'
import { type ContactStorageService } from '@core/domain/port/contact-storage-service'
import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'

export class GoogleSheetsServiceImpl implements ContactStorageService {
  static serviceAccountAuth: JWT

  constructor () {
    if (GoogleSheetsServiceImpl.serviceAccountAuth === undefined) {
      GoogleSheetsServiceImpl.serviceAccountAuth = new JWT({
        keyFile: process.env.GOOGLE_PRIVATE_KEY_FILE,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets'
        ]
      })
    }
  }

  public async getContacts (sheetId?: string): Promise<Contact[]> {
    if (sheetId === undefined) {
      throw new Error('sheet id is not received!')
    }
    const doc = new GoogleSpreadsheet(sheetId, GoogleSheetsServiceImpl.serviceAccountAuth)
    await doc.loadInfo()
    console.log(doc.title)
    throw new Error('It\'s not impl')
  }

  public async saveContacts (contacts: Contact[]): Promise<void> {

  }
}
