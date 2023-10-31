import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type CreateMovie } from '../../data/usecases/create.movie'
import { type MovieProps } from '../../domain/entities/movie'
import { created, serverError } from '../helpers/http.helper'

export class AddMovieController implements Controller<MovieProps> {
  constructor (private readonly create: CreateMovie) {}

  public async handle (input: MovieProps): Promise<HttpResponse> {
    try {
      const res = await this.create.perform(input)
      return created(res)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
