/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Contact } from '@core/domain/entity/contact'
import { type HubspotContactModel } from '../model/hubspot-contact.model'
import { ContactEmail } from '@core/domain/entity/contact-email'
import { type SimplePublicObjectWithAssociations } from '@hubspot/api-client/lib/codegen/crm/contacts'

export class HubspotServiceMapper {
  static toService (data: Contact): HubspotContactModel {
    return {}
  }

  static toDomain (data: SimplePublicObjectWithAssociations): Contact {
    return new Contact({
      businessName: data.properties.email,
      completeName: `${data.properties.firstname} ${data.properties.lastname}`,
      email: new ContactEmail(data.properties.email, data.properties.company),
      phone: data.properties.phone,
      website: data.properties.website
    })
  }
}
