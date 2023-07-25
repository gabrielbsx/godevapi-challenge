import { ConnectorPrivacy } from '@domain/entity/connector-privacy';
import { ConnectorEntity } from '@domain/entity/connector';
import { ConnectorType } from '@domain/entity/connector-type';
import { ConnectorRepository } from '@domain/repository/connector';
import {
  CreateConnectorUseCase,
  CreateConnectorUseCaseInput,
  CreateConnectorUseCaseOutput,
} from '@domain/usecases/create-connector';
import { Injectable } from '@nestjs/common';
import { ConnectorAlreadyExists } from './errors/connector-already-exists';

@Injectable()
export class CreateConnectorUseCaseImpl implements CreateConnectorUseCase {
  constructor(private readonly connectorRepository: ConnectorRepository) {}

  public async execute(
    input: CreateConnectorUseCaseInput,
  ): Promise<CreateConnectorUseCaseOutput> {
    const connectorType = new ConnectorType(input.type);
    const connectorPrivacy = new ConnectorPrivacy(input.privacy);
    const connector = new ConnectorEntity({
      ...input,
      type: connectorType,
      privacy: connectorPrivacy,
    });
    const connectorExists = await this.connectorRepository.findByName(
      connector.name,
    );
    if (connectorExists) {
      throw new ConnectorAlreadyExists();
    }
    await this.connectorRepository.create(connector);
    return {
      connector,
    };
  }
}
