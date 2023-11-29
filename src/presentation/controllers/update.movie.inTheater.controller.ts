import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IupdateMovieInTheater } from '../../data/protocols/update.movie.inTheater.protocol'
import { notFound, ok, serverError } from '../helpers/http.helper'

export interface idParam {
  id: string
}

export class UpdateMovieInTheaterController implements Controller<idParam> {
  constructor (private readonly update: IupdateMovieInTheater) {}

  public async handle (param: idParam): Promise<HttpResponse> {
    try {
      const res = await this.update.perform(param)
      if (res === null) return notFound('id not found')
      return ok(res)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
