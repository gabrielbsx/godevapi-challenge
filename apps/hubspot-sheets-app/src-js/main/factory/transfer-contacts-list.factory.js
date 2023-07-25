/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { TransferContactsListUseCaseImpl } = require('../../core/application/usecase/transfer-contacts-list.usecase')
const { TransferContactsListController } = require('../../core/presentation/controller/trasfer-contacts-list.controller')
const { GoogleSheetsServiceImpl } = require('../../infra/adapter/service/google-sheets/google-sheets.service')
const { HubspotContactService } = require('../../infra/adapter/service/hubspot/hubspot-contact.service')

module.exports = class TransferContactsListFactory {
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
