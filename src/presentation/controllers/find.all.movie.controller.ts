import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IlistMovie } from '../../data/protocols/list.movie.protocol'
import { noContent, ok, serverError } from '../helpers/http.helper'

export interface queryParamns {
  column?: string
  type?: 'asc' | 'desc'
  limit?: string
  page?: string
}

export class FindAllMovieController implements Controller<queryParamns> {
  constructor (private readonly list: IlistMovie) {}

  public async handle (paramns: queryParamns): Promise<HttpResponse> {
    try {
      const res = await this.list.perform(paramns)
      if (res.length === 0) return noContent()
      const body = {
        length: res.length,
        limit: paramns.limit,
        page: paramns.page,
        hasMore: res.hasMore,
        content: res.result
      }
      return ok(body)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
