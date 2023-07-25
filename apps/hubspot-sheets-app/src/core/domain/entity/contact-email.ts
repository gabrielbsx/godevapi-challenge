export class ContactEmail {
  private readonly email: string

  constructor (email: string, businessDomain: string) {
    const isEmailCorporative = this.validateIfEmailIsCorporative(email, businessDomain)

    if (!isEmailCorporative) {
      throw new Error(`Email ${email} is not corporative for domain ${businessDomain}`)
    }

    this.email = email
  }

  private validateIfEmailIsCorporative (email: string, businessDomain: string): boolean {
    businessDomain = businessDomain.toLowerCase().replace('www.', '').replace('http://', '').replace('https://', '')
    email = email.toLowerCase()
    return email.includes(businessDomain)
  }

  public get value (): string {
    return this.email
  }
}
