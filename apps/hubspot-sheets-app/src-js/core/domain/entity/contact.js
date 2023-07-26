/* eslint-disable @typescript-eslint/explicit-function-return-type */
export class Contact {
  _id
  props

  constructor (props, id) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }
    this._id = id ?? undefined
  }

  get id () {
    return this._id
  }

  get business () {
    return this.props.business
  }

  set business (business) {
    this.props.business = business
  }

  get completeName () {
    return this.props.completeName
  }

  set completeName (completeName) {
    this.props.completeName = completeName
  }

  get email () {
    return this.props.email
  }

  set email (email) {
    this.props.email = email
  }

  get phone () {
    return this.props.phone
  }

  set phone (phone) {
    this.props.phone = phone
  }

  get website () {
    return this.props.website
  }

  set website (website) {
    this.props.website = website
  }

  get createdAt () {
    return this.props.createdAt
  }

  set createdAt (createdAt) {
    this.props.createdAt = createdAt
  }

  get updatedAt () {
    return this.props.updatedAt
  }

  set updatedAt (updatedAt) {
    this.props.updatedAt = updatedAt
  }
}
