import { ConnectorEntity } from '@domain/entity/connector';
import { ConnectorRepository } from '@domain/repository/connector';
import { InMemoryRepositoryImpl } from './inmemory-impl';

export class InMemoryConnectorRepositoryImpl
  extends InMemoryRepositoryImpl<ConnectorEntity>
  implements ConnectorRepository
{
  public async findByName(name: string): Promise<ConnectorEntity[]> {
    return this.data.filter((connector) => connector.name === name);
  }

  public async findByCategory(category: string): Promise<ConnectorEntity[]> {
    return this.data.filter((connector) => connector.category === category);
  }

  public async findByType(type: string): Promise<ConnectorEntity[]> {
    return this.data.filter((connector) => connector.type === type);
  }

  public async findByPrivacy(privacy: string): Promise<ConnectorEntity[]> {
    return this.data.filter((connector) => connector.privacy === privacy);
  }
}
