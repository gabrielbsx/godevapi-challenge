import { ConnectorPrivacy } from '@domain/entity/connector-privacy';
import { ConnectorEntity } from '@domain/entity/connector';
import { ConnectorType } from '@domain/entity/connector-type';
import { ConnectorRepository } from '@domain/repository/connector';
import { Injectable } from '@nestjs/common';
import {
  UpdateConnectorUseCase,
  UpdateConnectorUseCaseInput,
  UpdateConnectorUseCaseOutput,
} from '@domain/usecases/update-connector';
import { ConnectorNotFound } from './errors/connector-not-found';

@Injectable()
export class UpdateConnectorUseCaseImpl implements UpdateConnectorUseCase {
  constructor(private readonly connectorRepository: ConnectorRepository) {}

  public async execute(
    input: UpdateConnectorUseCaseInput,
  ): Promise<UpdateConnectorUseCaseOutput> {
    const { id, ...inputWithoutId } = input;
    const connectorType = new ConnectorType(input.type);
    const connectorPrivacy = new ConnectorPrivacy(input.privacy);
    const connectorUpdate = new ConnectorEntity(
      {
        ...inputWithoutId,
        type: connectorType,
        privacy: connectorPrivacy,
      },
      id,
    );
    const connectorExists = await this.connectorRepository.findById(
      connectorUpdate.id,
    );
    if (!connectorExists) {
      throw new ConnectorNotFound();
    }
    const connectorUpdated = new ConnectorEntity(
      {
        ...connectorExists.propsValue,
        ...connectorUpdate.propsValue,
      },
      connectorUpdate.id,
    );
    await this.connectorRepository.update(id, connectorUpdated);
    return {
      connector: connectorUpdated,
    };
  }
}
