/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { ExpressControllerAdapter } = require('../../infra/adapter/http/express/http.controller')
const { TransferContactsListFactory } = require('../factory/transfer-contacts-list.factory')

module.exports = class TransferContactsListRoute {
  static register (router) {
    router.get('/transfer-contacts-list/:sheetId', ExpressControllerAdapter.adapt(TransferContactsListFactory.make()))
  }
}
