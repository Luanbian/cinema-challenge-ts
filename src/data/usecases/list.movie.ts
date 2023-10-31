import { type MovieProps } from '../../domain/entities/movie'
import { type FindAllMovie } from '../../infra/repositories/find.all.movie'

export class ListMovie {
  constructor (private readonly repository: FindAllMovie) {}

  public async perform (): Promise<MovieProps[]> {
    const result = await this.repository.findAll()
    return result
  }
}
