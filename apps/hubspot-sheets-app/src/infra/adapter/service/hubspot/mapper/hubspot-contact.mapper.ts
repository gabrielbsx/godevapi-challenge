import { Business } from '@core/domain/entity/business'
import { Contact } from '@core/domain/entity/contact'
import { ContactEmail } from '@core/domain/entity/contact-email'
import { type SimplePublicObjectWithAssociations } from '@hubspot/api-client/lib/codegen/crm/contacts'
export class HubspotServiceMapper {
  static toService (data: Contact): SimplePublicObjectWithAssociations {
    return {
      id: data.id as string,
      properties: {
        email: data.email.value,
        firstname: data.completeName.split(' ')[0],
        lastname: data.completeName.split(' ')[1],
        phone: data.phone,
        website: data.website
      },
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  }

  static toDomain (data: SimplePublicObjectWithAssociations): Contact {
    return new Contact({
      business: new Business({
        name: data.properties.company,
        domain: data.properties.website
      }),
      completeName: `${data.properties.firstname} ${data.properties.lastname}`,
      email: new ContactEmail(data.properties.email, data.properties.company),
      phone: data.properties.phone,
      website: data.properties.website
    })
  }
}
