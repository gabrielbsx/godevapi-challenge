import { ConnectorType } from './connector-type';
import { ConnectorPrivacy } from './connector-privacy';
import { randomUUID } from 'node:crypto';

export interface ConnectorProps {
  name: string;
  type: ConnectorType;
  privacy: ConnectorPrivacy;
  category: string;
  baseUrl: string;
  logoUrl: string;
  description: string;
  status: string;
}

export class ConnectorEntity {
  private readonly _id: string;
  private props: ConnectorProps;

  constructor(props: ConnectorProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get type(): ConnectorType {
    return this.props.type;
  }

  public set type(type: ConnectorType) {
    this.props.type = type;
  }

  public get privacy(): ConnectorPrivacy {
    return this.props.privacy;
  }

  public set privacy(privacy: ConnectorPrivacy) {
    this.props.privacy = privacy;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get baseUrl(): string {
    return this.props.baseUrl;
  }

  public set baseUrl(baseUrl: string) {
    this.props.baseUrl = baseUrl;
  }

  public get logoUrl(): string {
    return this.props.logoUrl;
  }

  public set logoUrl(logoUrl: string) {
    this.props.logoUrl = logoUrl;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get status(): string {
    return this.props.status;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get propsValue(): ConnectorProps {
    return this.props;
  }
}
