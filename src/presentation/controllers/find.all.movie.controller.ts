import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type ListMovie } from '../../data/usecases/list.movie'
import { noContent, ok, serverError } from '../helpers/http.helper'

export class FindAllMovieController implements Controller<null> {
  constructor (private readonly list: ListMovie) {}

  public async handle (): Promise<HttpResponse> {
    try {
      const res = await this.list.perform()
      if (res.length === 0) return noContent()
      return ok(res)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
