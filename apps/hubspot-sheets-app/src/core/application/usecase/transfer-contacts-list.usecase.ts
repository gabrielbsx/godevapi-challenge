import { type ContactStorageService } from '@core/domain/port/contact-storage-service'
import { type TransferContactsListUseCase } from '@core/domain/usecase/transfer-contacts-list.usecase'

export class TransferContactsListUseCaseImpl implements TransferContactsListUseCase {
  constructor (
    private readonly toContactStorageService: ContactStorageService,
    private readonly fromContactStorageService: ContactStorageService
  ) {}

  public async execute (): Promise<boolean> {
    const contacts = await this.fromContactStorageService.getContacts()
    await this.toContactStorageService.saveContacts(contacts)
    return true
  }
}
