import express, { type Application } from 'express'
import { TransferContactsListRoute } from './route/transfer-contacts-list.route'
import { config } from 'dotenv'

export class Server {
  private readonly app: Application

  constructor () {
    this.app = express()
    config()
  }

  public middlewares (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  public registerRoutes (): void {
    TransferContactsListRoute.register(this.app)
  }

  public bootstrap (): void {
    this.middlewares()
    this.registerRoutes()
  }

  public start (): void {
    this.app.listen(3000, () => {
      console.log('Server is listening on port 3000')
    })
  }
}
