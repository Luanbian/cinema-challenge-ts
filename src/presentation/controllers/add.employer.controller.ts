import { type HttpResponse } from '../../@types/http'

export class AddEmployerController {
  public async handle (): Promise<HttpResponse> {
    return {
      statusCode: 201,
      body: 'ok'
    }
  }
}
