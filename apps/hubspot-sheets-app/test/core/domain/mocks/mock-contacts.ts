import { faker } from '@faker-js/faker'
import { Contact } from '@core/domain/entity/contact'
import { ContactEmail } from '@core/domain/entity/contact-email'
import { Business } from '@core/domain/entity/business'

export const mockContact = (): Contact => {
  const name = faker.person.fullName()
  const phone = faker.phone.number()
  const corporationName = faker.company.name()
  const corporationDomain = faker.internet.domainName()
  const corporateNameToEmail = name.replace(/\s/g, '.').toLowerCase()
  const emailCorporate = `${corporateNameToEmail}@${corporationDomain}`
  const email = new ContactEmail(emailCorporate, corporationDomain)
  const website = faker.internet.url()
  return new Contact({
    business: new Business({
      name: corporationName,
      domain: corporationDomain
    }),
    completeName: name,
    email,
    phone,
    website
  })
}
