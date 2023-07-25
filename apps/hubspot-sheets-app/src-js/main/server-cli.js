/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { program } = require('commander')
const { TransferContactsListAction } = require('./action/transfer-contacts-list.action')
const { config } = require('dotenv')

export class ServerCli {
  app

  constructor () {
    this.app = program
    config()
  }

  registerActions () {
    TransferContactsListAction.register(this.app)
  }

  bootstrap () {
    this.app
      .command('transfer-list')
      .description('Transfer contacts list from Hubspot to Google Sheets')
    this.registerActions()
  }

  start () {
    console.log('Server cli is running')
    this.app.parse(process.argv)
  }
}
