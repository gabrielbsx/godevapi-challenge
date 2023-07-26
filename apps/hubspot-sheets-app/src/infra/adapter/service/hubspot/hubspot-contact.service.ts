import { type Contact } from '@core/domain/entity/contact'
import { type ContactStorageService } from '@core/application/port/contact-storage-service'
import { Client } from '@hubspot/api-client'
import { HubspotContactServiceMapper } from './mapper/hubspot-contact.mapper'
import { type BatchInputPublicObjectId } from '@hubspot/api-client/lib/codegen/crm/associations'
import { type SimplePublicObjectInputForCreate, type SimplePublicObjectWithAssociations } from '@hubspot/api-client/lib/codegen/crm/companies'
import { type Replace } from '@helpers/replace'

export interface ContactWithAssociation { business?: SimplePublicObjectWithAssociations, contact: SimplePublicObjectWithAssociations }
export type ContactsWithAssociations = Array<Replace<ContactWithAssociation, { business: SimplePublicObjectWithAssociations }>>

export class HubspotContactService implements ContactStorageService {
  static readonly hubspotClient: Client = new Client({ accessToken: process.env.HUBSPOT_API_KEY })
  public isSpreadSheet: boolean = false

  constructor () {
    if (HubspotContactService.hubspotClient.config.accessToken === undefined) {
      HubspotContactService.hubspotClient.setAccessToken(process.env.HUBSPOT_API_KEY)
    }
  }

  public async findContactByEmail (email: string): Promise<Contact | undefined> {
    const contact = await HubspotContactService.hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: email
            }
          ]
        }
      ],
      query: email,
      sorts: [],
      properties: [],
      limit: 1,
      after: 0
    })
    if (contact.total === 0) {
      return undefined
    }
    const contactWithAssociations = contact.results[0]
    const batchInputPublicObjectId: BatchInputPublicObjectId = {
      inputs: [
        {
          id: contactWithAssociations.id
        }
      ]
    }
    const associations = await HubspotContactService.hubspotClient.crm.associations.batchApi.read('contact', 'company', batchInputPublicObjectId)
    if (associations.results.length === 0) {
      return HubspotContactServiceMapper.toDomain({
        contact: contactWithAssociations,
        business: {
          id: '0',
          properties: {
            name: contact.results[0].properties.email.split('@')[1].split('.')[0],
            domain: contact.results[0].properties.email.split('@')[1]
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    }
    const companyId = associations.results[0].to[0].id
    const business = await HubspotContactService.hubspotClient.crm.companies.basicApi.getById(companyId)
    return HubspotContactServiceMapper.toDomain({ contact: contactWithAssociations, business })
  }

  public async getContacts (): Promise<Contact[]> {
    const allContacts = await HubspotContactService.hubspotClient.crm.contacts.getAll()
    const contactsWithAssociations = await Promise.all(
      allContacts.map(async (contact): Promise<ContactWithAssociation> => {
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
    const allContactsFiltered = contactsWithAssociations
      .filter((contactWithAssociations) => contactWithAssociations.business !== undefined) as ContactsWithAssociations
    return allContactsFiltered.map(HubspotContactServiceMapper.toDomain)
  }

  public async saveContacts (contacts: Contact[]): Promise<void> {
    const contactsDataService = contacts.map(HubspotContactServiceMapper.toService)
    void contactsDataService.map(async ({ properties }) => {
      const isContactExist = await this.findContactByEmail(properties.email)
      if (isContactExist !== undefined) {
        return await HubspotContactService.hubspotClient.crm.contacts.basicApi.update(isContactExist.id as string, { properties })
      }
      const simplePublicObjectInputForCreate: SimplePublicObjectInputForCreate = {
        properties,
        associations: []
      }
      return await HubspotContactService.hubspotClient.crm.contacts.basicApi.create(simplePublicObjectInputForCreate)
    })
  }
}
