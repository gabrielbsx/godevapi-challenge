import { CommanderControllerAdapter } from '@infra/adapter/cli/commander/cli.controller'
import { TransferContactsListFactory } from '../factory/transfer-contacts-list.factory'
import { type Command } from 'commander'

export class TransferContactsListAction {
  static register (app: Command): void {
    app
      .command('transfer-contacts-list')
      .description('Transfer contacts list from Hubspot to Google Sheets')
      .option('-s, --sheet-id <sheet-id>', 'Google Sheet ID')
      .action(async (args: any) => {
        const controller = TransferContactsListFactory.make()
        const cliController = CommanderControllerAdapter.adapt(controller)
        const cliResponse = await cliController({ params: args })
        console.log(cliResponse)
      })
  }
}
