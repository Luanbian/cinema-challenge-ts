import { type CreateMovie } from '../../data/usecases/create.movie'
import { type Movie, type MovieProps } from '../../domain/entities/movie'

export class MovieController {
  constructor (private readonly create: CreateMovie) {}

  public async add (input: MovieProps): Promise<Movie> {
    const res = await this.create.perform(input)
    return res
  }
}
