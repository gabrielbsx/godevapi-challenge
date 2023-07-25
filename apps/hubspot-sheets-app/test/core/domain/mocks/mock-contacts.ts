import { faker } from '@faker-js/faker'
import { Contact } from '@core/domain/entity/contact'
import { ContactEmail } from '@core/domain/entity/contact-email'

export const mockContact = (): Contact => {
  const name = faker.person.fullName()
  const phone = faker.phone.number()
  const corporationName = faker.company.name()
  const corporationNameToDomain = corporationName.replace(/[^a-zA-Z0-9]/g, '')
  const emailCorporate = `${name as string}@${corporationNameToDomain as string}.com`
  const email = new ContactEmail(emailCorporate, corporationName)
  const website = faker.internet.url()
  return new Contact({ businessName: corporationName, completeName: name, email, phone, website })
}
