import { HubspotContactService } from '@infra/adapter/service/hubspot/hubspot-contact.service'
import { config } from 'dotenv'

config()

const main = async (): Promise<void> => {
  console.log('Starting integration hubspot sheet app')
  const hubspotContactService = new HubspotContactService()
  const contacts = await hubspotContactService.getContacts()
  console.log(contacts)
}

main().catch((error) => { console.error(error) })
