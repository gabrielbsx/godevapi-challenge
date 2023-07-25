import { Business } from '@core/domain/entity/business'
import { Contact } from '@core/domain/entity/contact'
import { ContactEmail } from '@core/domain/entity/contact-email'
import { type SimplePublicObjectInputForCreate } from '@hubspot/api-client/lib/codegen/crm/companies'
import { type SimplePublicObjectWithAssociations } from '@hubspot/api-client/lib/codegen/crm/contacts'

export class HubspotContactServiceMapper {
  static toService (data: Contact): SimplePublicObjectWithAssociations | SimplePublicObjectInputForCreate {
    const [firstName, ...lastName] = data.completeName.split(' ')
    const lastNameJoined = lastName.join(' ')
    return {
      id: data.id as string,
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

  static toDomain (data: { business: SimplePublicObjectWithAssociations, contact: SimplePublicObjectWithAssociations }): Contact {
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
