import { type MovieProps } from '../../domain/entities/movie'
import { type FindAllMovie } from '../../infra/repositories/find.all.movie'
import { type queryParamns } from '../../presentation/controllers/find.all.movie.controller'

export class ListMovie {
  constructor (private readonly repository: FindAllMovie) {}

  public async perform ({ column, type }: queryParamns): Promise<MovieProps[]> {
    if (typeof column === 'undefined') {
      column = 'name'
    }
    if (typeof type === 'undefined') {
      type = 'asc'
    }
    const result = await this.repository.findAll({ column, type })
    return result
  }
}
