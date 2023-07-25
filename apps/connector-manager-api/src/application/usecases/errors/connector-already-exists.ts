export class ConnectorAlreadyExists extends Error {
  constructor() {
    super('Connector already exists');
    this.name = 'ConnectorAlreadyExists';
  }
}
