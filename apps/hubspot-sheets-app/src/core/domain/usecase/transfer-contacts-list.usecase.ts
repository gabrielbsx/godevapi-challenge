export interface TransferContactsListUseCase {
  execute: () => Promise<TransferContactsListUseCaseOutput>
}

export type TransferContactsListUseCaseOutput = boolean
