/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { JWT } = require('google-auth-library')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { GoogleSheetsServiceMapper } = require('./mapper/google-sheets.mapper')

export class GoogleSheetsServiceImpl {
  static serviceAccountAuth

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

  async getContacts (sheetId) {
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
    const domainData = rows.map((row) => {
      try {
        return GoogleSheetsServiceMapper.toDomain(row)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
        return null
      }
    })
    const domainWithoutNull = domainData.filter((domain) => domain !== null)
    return domainWithoutNull
  }

  async saveContacts (_contacts) {
    throw new Error('Method saveContacts in google sheets not implemented.')
  }
}
