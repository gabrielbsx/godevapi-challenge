export interface BusinessProps {
  name: string
  domain: string
}

export class Business {
  private readonly props: BusinessProps

  constructor (props: BusinessProps) {
    this.props = props
  }

  public get name (): string {
    return this.props.name
  }

  public set name (name: string) {
    this.props.name = name
  }

  public get domain (): string {
    return this.props.domain
  }

  public set domain (domain: string) {
    this.props.domain = domain
  }
}
