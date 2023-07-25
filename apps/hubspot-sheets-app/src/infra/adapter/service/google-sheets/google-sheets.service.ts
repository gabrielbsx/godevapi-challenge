import { type Contact } from '@core/domain/entity/contact'
import { type ContactStorageService } from '@core/domain/port/contact-storage-service'
import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { GoogleSheetsServiceMapper } from './mapper/google-sheets.mapper'

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
    const hasSheet = doc.sheetsByIndex.length > 0
    if (!hasSheet) {
      throw new Error('sheet is not found!')
    }
    const hasRows = doc.sheetsByIndex[0].rowCount > 0
    if (!hasRows) {
      throw new Error('rows is not found!')
    }
    const sheet = doc.sheetsByIndex[0]
    await sheet.loadCells()
    const rows = await sheet.getRows()
    return rows.map((row) => GoogleSheetsServiceMapper.toDomain(row))
  }

  public async saveContacts (contacts: Contact[]): Promise<void> {

  }
}
