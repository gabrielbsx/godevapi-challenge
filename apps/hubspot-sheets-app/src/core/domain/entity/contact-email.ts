export class ContactEmail {
  private readonly email: string

  constructor (email: string, businessName: string) {
    const isEmailCorporative = this.validateIfEmailIsCorporative(email, businessName)

    if (!isEmailCorporative) {
      throw new Error('Email is not corporative')
    }

    this.email = email
  }

  private validateIfEmailIsCorporative (email: string, businessName: string): boolean {
    businessName = businessName.toLowerCase()
    email = email.toLowerCase()
    const businessNameWithOnlyAcceptedCharacters = businessName.replace(/[^a-z0-9]/g, '')
    return email.includes(businessNameWithOnlyAcceptedCharacters)
  }

  public get value (): string {
    return this.email
  }
}
