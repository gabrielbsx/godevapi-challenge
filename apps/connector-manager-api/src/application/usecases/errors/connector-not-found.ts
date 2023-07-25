export class ConnectorNotFound extends Error {
  constructor() {
    super('Connector not found');
    this.name = 'ConnectorNotFound';
  }
}
