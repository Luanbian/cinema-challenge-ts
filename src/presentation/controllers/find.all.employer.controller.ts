import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { ok, serverError } from '../helpers/http.helper'

export class FindAllEmployerController implements Controller<null> {
  public async handle (): Promise<HttpResponse> {
    try {
      return ok('tudo certo')
    } catch (error) {
      return serverError(error)
    }
  }
}
