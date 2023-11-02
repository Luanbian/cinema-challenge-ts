import express from 'express'
import routes from './routes/routes'

export const app = express()
class Server {
  private readonly port = 8080

  private middleware (): void {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
  }

  private start (): void {
    const callback = (): void => { console.log('server running at ' + this.port) }
    app.listen(this.port, callback)
  }

  public bootstrap (): void {
    this.middleware()
    routes(app)
    this.start()
  }
}
const server = new Server()
server.bootstrap()
