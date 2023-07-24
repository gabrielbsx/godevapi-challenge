import { ConnectorEntity } from '../entity/connector';
import { Repository } from './repository';

export abstract class ConnectorRepository extends Repository<ConnectorEntity> {}
