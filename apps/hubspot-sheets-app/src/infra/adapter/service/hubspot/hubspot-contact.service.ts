import { type Contact } from '@core/domain/entity/contact'
import { type ContactStorageService } from '@core/domain/port/contact-storage-service'
import { Client } from '@hubspot/api-client'
import { HubspotServiceMapper } from './mapper/hubspot-contact.mapper'

export class HubspotContactService implements ContactStorageService {
  static readonly hubspotClient: Client = new Client({ accessToken: process.env.HUBSPOT_API_KEY })

  constructor () {
    if (HubspotContactService.hubspotClient.config.accessToken !== undefined) {
      return
    }
    HubspotContactService.hubspotClient.setAccessToken(process.env.HUBSPOT_API_KEY)
  }

  public async getContacts (): Promise<Contact[]> {
    const contacts = await HubspotContactService.hubspotClient.crm.contacts.getAll(undefined, undefined, [
      'email',
      'firstname',
      'lastname',
      'phone',
      'website',
      'company'
    ])
    return contacts.map(HubspotServiceMapper.toDomain)
  }

  public async saveContacts (contacts: Contact[]): Promise<void> {
  }
}
