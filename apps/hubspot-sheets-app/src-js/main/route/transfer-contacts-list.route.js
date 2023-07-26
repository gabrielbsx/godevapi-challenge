/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ExpressControllerAdapter } from '../../infra/adapter/http/express/http.controller.js'
import { TransferContactsListFactory } from '../factory/transfer-contacts-list.factory.js'

export class TransferContactsListRoute {
  static register (router) {
    router.get('/transfer-contacts-list/:sheetId', ExpressControllerAdapter.adapt(TransferContactsListFactory.make()))
  }
}
