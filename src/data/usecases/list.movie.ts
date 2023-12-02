import { type Movie } from '../../domain/entities/movie'
import { type IfindAllMovies } from '../../infra/protocols/find.all.movies.protocols'
import { type queryParamns } from '../../presentation/controllers/find.all.movie.controller'
import { type IlistMovie } from '../protocols/list.movie.protocol'

export class ListMovie implements IlistMovie {
  constructor (private readonly repository: IfindAllMovies) {}

  public async perform ({ column, type, limit, page }: queryParamns): Promise<{
    result: Movie[]
    length: number
    hasMore: boolean
  }> {
    const { result, length, hasMore } = await this.repository.findAll({
      column: column ?? 'name',
      type: type ?? 'asc',
      limit: limit ?? '100',
      page: page ?? '1'
    })
    return { result, length, hasMore }
  }
}
