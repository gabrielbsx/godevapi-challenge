/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export class ContactEmail {
  email

  constructor (email, businessDomain) {
    const isEmailCorporative = this.validateIfEmailIsCorporative(email, businessDomain)

    if (!isEmailCorporative) {
      throw new Error(`Email ${email} is not corporative for domain ${businessDomain}`)
    }

    this.email = email
  }

  validateIfEmailIsCorporative (email, businessDomain) {
    businessDomain = businessDomain.toLowerCase().replace('www.', '').replace('http://', '').replace('https://', '')
    email = email.toLowerCase()
    return email.includes(businessDomain)
  }

  get value () {
    return this.email
  }
}
