/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TransferContactsListUseCaseImpl } from '../../core/application/usecase/transfer-contacts-list.usecase.js'
import { TransferContactsListController } from '../../core/presentation/controller/trasfer-contacts-list.controller.js'
import { GoogleSheetsServiceImpl } from '../../infra/adapter/service/google-sheets/google-sheets.service.js'
import { HubspotContactService } from '../../infra/adapter/service/hubspot/hubspot-contact.service.js'

export class TransferContactsListFactory {
  static make () {
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
