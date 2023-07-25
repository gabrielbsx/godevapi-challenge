/* eslint-disable @typescript-eslint/explicit-function-return-type */
export class Business {
  props

  constructor (props) {
    this.props = props
  }

  get name () {
    return this.props.name
  }

  set name (name) {
    this.props.name = name
  }

  get domain () {
    return this.props.domain
  }

  set domain (domain) {
    this.props.domain = domain
  }
}
