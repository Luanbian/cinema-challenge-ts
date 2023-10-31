import express from 'express'

class Server {
  private readonly app = express()
  private readonly port = 8080

  private middleware (): void {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  private start (): void {
    const callback = (): void => { console.log('server running at ' + this.port) }
    this.app.listen(this.port, callback)
  }

  public bootstrap (): void {
    this.middleware()
    this.start()
  }
}
const server = new Server()
server.bootstrap()
