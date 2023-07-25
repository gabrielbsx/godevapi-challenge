export interface TransferContactsListUseCase {
  execute: (input: TransferContactsListUseCaseInput) => Promise<TransferContactsListUseCaseOutput>
}

export interface TransferContactsListUseCaseInput {
  spreadId?: string
}

export type TransferContactsListUseCaseOutput = boolean
