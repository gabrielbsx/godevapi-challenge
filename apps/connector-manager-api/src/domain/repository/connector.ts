import { ConnectorEntity } from '../entity/connector';
import { Repository } from './repository';

export abstract class ConnectorRepository extends Repository<ConnectorEntity> {
  public abstract findByName(name: string): Promise<ConnectorEntity[]>;
  public abstract findByCategory(category: string): Promise<ConnectorEntity[]>;
  public abstract findByType(type: string): Promise<ConnectorEntity[]>;
  public abstract findByPrivacy(privacy: string): Promise<ConnectorEntity[]>;
}
