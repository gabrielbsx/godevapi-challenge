/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { Client } = require('@hubspot/api-client')
const { HubspotContactServiceMapper } = require('./mapper/hubspot-contact.mapper')

export class HubspotContactService {
  static hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY })
  isSpreadSheet = false

  constructor () {
    if (HubspotContactService.hubspotClient.config.accessToken === undefined) {
      HubspotContactService.hubspotClient.setAccessToken(process.env.HUBSPOT_API_KEY)
    }
  }

  async findContactByEmail (email) {
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
    const batchInputPublicObjectId = {
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

  async getContacts () {
    const allContacts = await HubspotContactService.hubspotClient.crm.contacts.getAll()
    const contactsWithAssociations = await Promise.all(
      allContacts.map(async (contact) => {
        const batchInputPublicObjectId = {
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
      .filter((contactWithAssociations) => contactWithAssociations.business !== undefined)
    return allContactsFiltered.map(HubspotContactServiceMapper.toDomain)
  }

  async saveContacts (contacts) {
    const contactsDataService = contacts.map(HubspotContactServiceMapper.toService)
    void contactsDataService.map(async ({ properties }) => {
      const isContactExist = await this.findContactByEmail(properties.email)
      if (isContactExist !== undefined) {
        return await HubspotContactService.hubspotClient.crm.contacts.basicApi.update(isContactExist.id, { properties })
      }
      const simplePublicObjectInputForCreate = {
        properties,
        associations: []
      }
      return await HubspotContactService.hubspotClient.crm.contacts.basicApi.create(simplePublicObjectInputForCreate)
    })
  }
}
