import { ConnectorEntity } from '@domain/entity/connector';

export interface CreateConnectorUseCase {
  execute(
    input: CreateConnectorUseCaseInput,
  ): Promise<CreateConnectorUseCaseOutput>;
}

export interface CreateConnectorUseCaseInput {
  name: string;
  type: string;
  privacy: string;
  category: string;
  baseUrl: string;
  logoUrl: string;
  description: string;
  status: string;
}

export interface CreateConnectorUseCaseOutput {
  connector: ConnectorEntity;
}
