/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ExpressControllerAdapter } from '@infra/adapter/http/express/http.controller'
import { TransferContactsListFactory } from '../factory/transfer-contacts-list.factory'

export class TransferContactsListRoute {
  static register (router) {
    router.get('/transfer-contacts-list/:sheetId', ExpressControllerAdapter.adapt(TransferContactsListFactory.make()))
  }
}
