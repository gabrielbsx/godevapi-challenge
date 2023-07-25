import { ConnectorEntity } from '@domain/entity/connector';
import { ConnectorPrivacy } from '@domain/entity/connector-privacy';
import { ConnectorType } from '@domain/entity/connector-type';
import { ConnectorInMemory } from '../model/in-memory-model';

export class InMemoryConnectorMapper {
  static toPersistence(data: ConnectorEntity): ConnectorInMemory {
    return {
      id: data.id,
      name: data.name,
      type: data.type.value,
      privacy: data.privacy.value,
      category: data.category,
      baseUrl: data.baseUrl,
      logoUrl: data.logoUrl,
      description: data.description,
      status: data.status,
    };
  }

  static toDomain(data: ConnectorInMemory): ConnectorEntity {
    return new ConnectorEntity(
      {
        name: data.name,
        type: new ConnectorType(data.type),
        privacy: new ConnectorPrivacy(data.privacy),
        category: data.category,
        baseUrl: data.baseUrl,
        logoUrl: data.logoUrl,
        description: data.description,
        status: data.status,
      },
      data.id,
    );
  }
}
