/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const { TransferContactsListRoute } = require('./route/transfer-contacts-list.route')
const { config } = require('dotenv')

export class Server {
  app

  constructor () {
    this.app = express()
    config()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  registerRoutes () {
    TransferContactsListRoute.register(this.app)
  }

  bootstrap () {
    this.middlewares()
    this.registerRoutes()
  }

  start () {
    this.app.listen(3000, () => {
      console.log('Server is listening on port 3000')
    })
  }
}
