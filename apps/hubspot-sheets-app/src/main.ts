import { TransferContactsListUseCaseImpl } from '@core/application/usecase/transfer-contacts-list.usecase'
import { GoogleSheetsServiceImpl } from '@infra/adapter/service/google-sheets/google-sheets.service'
import { HubspotContactService } from '@infra/adapter/service/hubspot/hubspot-contact.service'
import { config } from 'dotenv'

config()

const main = async (): Promise<void> => {
  const sheetId = '1FVlfOM3pAxCuqzuPep8_vFidQ8FSH2jODecAD7ieNXc'
  const googleSheetsService = new GoogleSheetsServiceImpl()
  const hubspotContactService = new HubspotContactService()
  const transferContactsListUseCase = new TransferContactsListUseCaseImpl(
    hubspotContactService,
    googleSheetsService
  )
  void transferContactsListUseCase.execute({ sheetId })
  await googleSheetsService.getContacts(sheetId)
  console.log('Done')
}

main().catch((error) => { console.error(error) })
