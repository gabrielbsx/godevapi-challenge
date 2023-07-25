import { type ContactEmail } from './contact-email'

interface ContactProps {
  businessName: string
  completeName: string
  email: ContactEmail
  phone: string
  website: string
}

export class Contact {
  private readonly props: ContactProps

  constructor (props: ContactProps) {
    this.props = props
  }

  public get businessName (): string {
    return this.props.businessName
  }

  public set businessName (businessName: string) {
    this.props.businessName = businessName
  }

  public get completeName (): string {
    return this.props.completeName
  }

  public set completeName (completeName: string) {
    this.props.completeName = completeName
  }

  public get email (): ContactEmail {
    return this.props.email
  }

  public set email (email: ContactEmail) {
    this.props.email = email
  }

  public get phone (): string {
    return this.props.phone
  }

  public set phone (phone: string) {
    this.props.phone = phone
  }

  public get website (): string {
    return this.props.website
  }

  public set website (website: string) {
    this.props.website = website
  }
}
