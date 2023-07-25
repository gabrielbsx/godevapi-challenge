import { type ContactStorageService } from '@core/application/port/contact-storage-service'
import { type TransferContactsListUseCaseInput, type TransferContactsListUseCase } from '@core/domain/usecase/transfer-contacts-list.usecase'

export class TransferContactsListUseCaseImpl implements TransferContactsListUseCase {
  constructor (
    private readonly toContactStorageService: ContactStorageService,
    private readonly fromContactStorageService: ContactStorageService
  ) {}

  public async execute (input: TransferContactsListUseCaseInput): Promise<boolean> {
    const contacts = await this.fromContactStorageService.getContacts(input.sheetId)
    await this.toContactStorageService.saveContacts(contacts)
    return true
  }
}
