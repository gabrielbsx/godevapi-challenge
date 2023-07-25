/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { Business } = require('../../../../../core/domain/entity/business')
const { Contact } = require('../../../../../core/domain/entity/contact')
const { ContactEmail } = require('../../../../../core/domain/entity/contact-email')

module.exports = class GoogleSheetsServiceMapper {
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
