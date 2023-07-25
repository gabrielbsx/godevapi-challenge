import { TransferContactsListUseCaseImpl } from '@core/application/usecase/transfer-contacts-list.usecase'
import { TransferContactsListController } from '@core/presentation/controller/trasfer-contacts-list.controller'
import { GoogleSheetsServiceImpl } from '@infra/adapter/service/google-sheets/google-sheets.service'
import { HubspotContactService } from '@infra/adapter/service/hubspot/hubspot-contact.service'

export class TransferContactsListFactory {
  static make (): TransferContactsListController {
    const googleSheetsService = new GoogleSheetsServiceImpl()
    const hubspotContactService = new HubspotContactService()
    const transferContactsListUseCase = new TransferContactsListUseCaseImpl(
      hubspotContactService,
      googleSheetsService
    )
    const transferContactsListController = new TransferContactsListController(
      transferContactsListUseCase
    )
    return transferContactsListController
  }
}
