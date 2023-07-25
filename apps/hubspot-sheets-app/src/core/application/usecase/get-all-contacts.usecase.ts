import { type GetAllContactsUseCaseOutput, type GetAllContactsUseCase } from '@core/domain/usecase/get-all-contacts.usecase'
import { type ContactStorageService } from '@core/application/port/contact-storage-service'

export class GetAllContactsUseCaseImpl implements GetAllContactsUseCase {
  constructor (private readonly contactStorageService: ContactStorageService) {}

  public async execute (): Promise<GetAllContactsUseCaseOutput> {
    const contacts = await this.contactStorageService.getContacts()
    return { contacts }
  }
}
