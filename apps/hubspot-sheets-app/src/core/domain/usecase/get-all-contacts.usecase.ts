import { type Contact } from '@core/domain/entity/contact'

export interface GetAllContactsUseCase {
  execute: () => Promise<GetAllContactsUseCaseOutput>
}

export interface GetAllContactsUseCaseOutput {
  contacts: Contact[]
}
