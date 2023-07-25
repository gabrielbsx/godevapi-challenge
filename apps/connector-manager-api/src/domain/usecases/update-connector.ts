import { ConnectorEntity } from '@domain/entity/connector';

export interface UpdateConnectorUseCase {
  execute(
    input: UpdateConnectorUseCaseInput,
  ): Promise<UpdateConnectorUseCaseOutput>;
}

export interface UpdateConnectorUseCaseInput {
  id: string;
  name: string;
  type: string;
  privacy: string;
  category: string;
  baseUrl: string;
  logoUrl: string;
  description: string;
  status: string;
}

export interface UpdateConnectorUseCaseOutput {
  connector: ConnectorEntity;
}
