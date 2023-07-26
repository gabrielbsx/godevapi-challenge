/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommanderControllerAdapter } from '../../infra/adapter/cli/commander/cli.controller.js'
import { TransferContactsListFactory } from '../factory/transfer-contacts-list.factory.js'

export class TransferContactsListAction {
  static register (app) {
    app
      .command('transfer-contacts-list')
      .description('Transfer contacts list from Hubspot to Google Sheets')
      .option('-s, --sheet-id <sheet-id>', 'Google Sheet ID')
      .action(async (args) => {
        const controller = TransferContactsListFactory.make()
        const cliController = CommanderControllerAdapter.adapt(controller)
        const cliResponse = await cliController({ params: args })
        console.log(cliResponse)
      })
  }
}
