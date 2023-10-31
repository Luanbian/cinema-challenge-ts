import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type CreateMovie } from '../../data/usecases/create.movie'
import { type MovieProps } from '../../domain/entities/movie'

export class MovieController implements Controller<MovieProps> {
  constructor (private readonly create: CreateMovie) {}

  public async handle (input: MovieProps): Promise<HttpResponse> {
    const res = await this.create.perform(input)
    return {
      statusCode: 200,
      body: res
    }
  }
}
