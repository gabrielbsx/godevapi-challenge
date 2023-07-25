export interface TransferContactsListUseCase {
  execute: (input: TransferContactsListUseCaseInput) => Promise<TransferContactsListUseCaseOutput>
}

export interface TransferContactsListUseCaseInput {
  sheetId?: string
}

export type TransferContactsListUseCaseOutput = boolean
