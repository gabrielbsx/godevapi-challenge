import { type Replace } from '@helpers/replace'
import { type Business } from './business'
import { type ContactEmail } from './contact-email'

interface ContactProps {
  business: Business
  completeName: string
  email: ContactEmail
  phone: string
  website: string
  createdAt: Date
  updatedAt: Date
}

export class Contact {
  private readonly _id?: string
  private readonly props: ContactProps

  constructor (props: Replace<ContactProps, {
    createdAt?: Date
    updatedAt?: Date
  }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }
    this._id = id ?? undefined
  }

  public get id (): string | undefined {
    return this._id
  }

  public get business (): Business {
    return this.props.business
  }

  public set business (business: Business) {
    this.props.business = business
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

  public get createdAt (): Date {
    return this.props.createdAt
  }

  public set createdAt (createdAt: Date) {
    this.props.createdAt = createdAt
  }

  public get updatedAt (): Date {
    return this.props.updatedAt
  }

  public set updatedAt (updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}
