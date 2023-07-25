export class ContactEmail {
  private readonly email: string

  constructor (email: string, businessDomain: string) {
    const isEmailCorporative = this.validateIfEmailIsCorporative(email, businessDomain)

    if (!isEmailCorporative) {
      throw new Error('Email is not corporative')
    }

    this.email = email
  }

  private validateIfEmailIsCorporative (email: string, businessDomain: string): boolean {
    businessDomain = businessDomain.toLowerCase()
    email = email.toLowerCase()
    return email.includes(businessDomain)
  }

  public get value (): string {
    return this.email
  }
}
