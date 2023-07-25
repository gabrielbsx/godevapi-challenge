import { type Contact } from '@core/domain/entity/contact'
import { type ContactStorageService } from '@core/domain/port/contact-storage-service'
import { Client } from '@hubspot/api-client'
import { HubspotContactServiceMapper } from './mapper/hubspot-contact.mapper'
import { type BatchInputPublicObjectId } from '@hubspot/api-client/lib/codegen/crm/associations'
import { type SimplePublicObjectWithAssociations } from '@hubspot/api-client/lib/codegen/crm/companies'

export class HubspotContactService implements ContactStorageService {
  static readonly hubspotClient: Client = new Client({ accessToken: process.env.HUBSPOT_API_KEY })
  public isSpreadSheet: boolean = false

  constructor () {
    if (HubspotContactService.hubspotClient.config.accessToken === undefined) {
      HubspotContactService.hubspotClient.setAccessToken(process.env.HUBSPOT_API_KEY)
    }
  }

  public async getContacts (): Promise<Contact[]> {
    const allContacts = await HubspotContactService.hubspotClient.crm.contacts.getAll()
    const contactsWithAssociations = await Promise.all(
      allContacts.map(async (contact): Promise<{ contact: SimplePublicObjectWithAssociations, business: SimplePublicObjectWithAssociations | undefined }> => {
        const batchInputPublicObjectId: BatchInputPublicObjectId = {
          inputs: [
            {
              id: contact.id
            }
          ]
        }
        const associations = await HubspotContactService.hubspotClient.crm.associations.batchApi.read('contact', 'company', batchInputPublicObjectId)
        if (associations.results.length === 0) {
          return { contact, business: undefined }
        }
        const companyId = associations.results[0].to[0].id
        const business = await HubspotContactService.hubspotClient.crm.companies.basicApi.getById(companyId)
        return { contact, business }
      })
    )
    const allContactsFiltered = contactsWithAssociations.filter((contactWithAssociations) => contactWithAssociations.business !== undefined) as Array<{ contact: SimplePublicObjectWithAssociations, business: SimplePublicObjectWithAssociations }>
    return allContactsFiltered.map(HubspotContactServiceMapper.toDomain)
  }

  public async saveContacts (contacts: Contact[]): Promise<void> {
  }
}
