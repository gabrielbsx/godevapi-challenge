import { ExpressControllerAdapter } from '@infra/adapter/http/express/http.controller'
import { TransferContactsListFactory } from '../factory/transfer-contacts-list.factory'
import { type Router } from 'express'

export class TransferContactsListRoute {
  static register (router: Router): void {
    router.get('/transfer-contacts-list/:sheetId', ExpressControllerAdapter.adapt(TransferContactsListFactory.make()))
  }
}
