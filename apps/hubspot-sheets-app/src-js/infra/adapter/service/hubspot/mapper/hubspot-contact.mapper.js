/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Business } from '../../../../../core/domain/entity/business.js'
import { Contact } from '../../../../../core/domain/entity/contact.js'
import { ContactEmail } from '../../../../../core/domain/entity/contact-email.js'

export class HubspotContactServiceMapper {
  static toService (data) {
    const [firstName, ...lastName] = data.completeName.split(' ')
    const lastNameJoined = lastName.join(' ')
    return {
      id: data.id,
      properties: {
        email: data.email.value,
        firstname: firstName,
        lastname: lastNameJoined,
        phone: data.phone,
        website: data.website
      },
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  }

  static toDomain (data) {
    return new Contact(
      {
        business: new Business({
          name: data.business.properties.name,
          domain: data.business.properties.domain
        }),
        completeName: `${data.contact.properties.firstname} ${data.contact.properties.lastname}`,
        email: new ContactEmail(data.contact.properties.email, data.business.properties.domain),
        phone: data.contact.properties.phone,
        website: data.contact.properties.website
      },
      data.contact.id
    )
  }
}
