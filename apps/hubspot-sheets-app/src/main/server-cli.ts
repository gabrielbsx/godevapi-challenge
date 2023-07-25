import { type Command, program } from 'commander'
import { TransferContactsListAction } from './action/transfer-contacts-list.action'
import { config } from 'dotenv'

export class ServerCli {
  private readonly app: Command

  constructor () {
    this.app = program
    config()
  }

  public registerActions (): void {
    TransferContactsListAction.register(this.app)
  }

  public bootstrap (): void {
    this.app
      .command('transfer-list')
      .description('Transfer contacts list from Hubspot to Google Sheets')
    this.registerActions()
  }

  public start (): void {
    console.log('Server cli is running')
    this.app.parse(process.argv)
  }
}
