/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Business } from '../../../../../core/domain/entity/business.js'
import { Contact } from '../../../../../core/domain/entity/contact.js'
import { ContactEmail } from '../../../../../core/domain/entity/contact-email.js'

export class GoogleSheetsServiceMapper {
  static toDomain (data) {
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
