import { Business } from '@core/domain/entity/business'
import { Contact } from '@core/domain/entity/contact'
import { ContactEmail } from '@core/domain/entity/contact-email'
import { type GoogleSpreadsheetRow } from 'google-spreadsheet'

export class GoogleSheetsServiceMapper {
  static toDomain (data: GoogleSpreadsheetRow<Record<string, any>>): Contact {
    return new Contact({
      business: new Business({
        name: data.get('Nome da empresa'),
        domain: data.get('website')
      }),
      completeName: data.get('Nome completo'),
      email: new ContactEmail(data.get('email'), data.get('website')),
      phone: data.get('telefone'),
      website: data.get('website')
    })
  }
}
