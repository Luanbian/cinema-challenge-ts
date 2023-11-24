import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IlistEmployer } from '../../data/protocols/list.employer.protocol'
import { noContent, ok, serverError } from '../helpers/http.helper'

export class FindAllEmployerController implements Controller<null> {
  constructor (private readonly list: IlistEmployer) {}

  public async handle (): Promise<HttpResponse> {
    try {
      const res = await this.list.perform()
      if (res.length === 0) return noContent()
      const body = {
        length: res.length,
        hasMore: res.hasMore,
        content: res.result
      }
      return ok(body)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
