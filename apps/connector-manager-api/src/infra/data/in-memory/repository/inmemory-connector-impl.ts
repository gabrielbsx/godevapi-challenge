import { ConnectorEntity } from '@domain/entity/connector';
import { ConnectorRepository } from '@domain/repository/connector';
import { InMemoryConnectorMapper } from '../mapper/inmemory-connector-mapper';
import { ConnectorInMemory } from '../model/in-memory-model';

export class InMemoryConnectorRepositoryImpl implements ConnectorRepository {
  private data: ConnectorInMemory[] = [];

  public async create(data: ConnectorEntity): Promise<void> {
    this.data.push(InMemoryConnectorMapper.toPersistence(data));
  }

  public async update(id: string, data: ConnectorEntity): Promise<void> {
    const index = this.data.findIndex((connector) => connector.id === data.id);
    this.data[index] = InMemoryConnectorMapper.toPersistence(data);
  }

  public async delete(id: string): Promise<void> {
    const index = this.data.findIndex((connector) => connector.id === id);
    this.data.splice(index, 1);
  }

  public async findById(id: string): Promise<ConnectorEntity> {
    const connector = this.data.find((connector) => connector.id === id);
    return InMemoryConnectorMapper.toDomain(connector);
  }

  public async findAll(): Promise<ConnectorEntity[]> {
    return this.data.map((connector) =>
      InMemoryConnectorMapper.toDomain(connector),
    );
  }

  public async findByName(name: string): Promise<ConnectorEntity[]> {
    const connectors = this.data.filter((connector) => connector.name === name);
    return connectors.map((connector) =>
      InMemoryConnectorMapper.toDomain(connector),
    );
  }

  public async findByCategory(category: string): Promise<ConnectorEntity[]> {
    const connectors = this.data.filter(
      (connector) => connector.category === category,
    );
    return connectors.map((connector) =>
      InMemoryConnectorMapper.toDomain(connector),
    );
  }

  public async findByType(type: string): Promise<ConnectorEntity[]> {
    const connectors = this.data.filter((connector) => connector.type === type);
    return connectors.map((connector) =>
      InMemoryConnectorMapper.toDomain(connector),
    );
  }

  public async findByPrivacy(privacy: string): Promise<ConnectorEntity[]> {
    const connectors = this.data.filter(
      (connector) => connector.privacy === privacy,
    );
    return connectors.map((connector) =>
      InMemoryConnectorMapper.toDomain(connector),
    );
  }
}
