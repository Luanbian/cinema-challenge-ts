import { type Movie } from '../../domain/entities/movie'
import { type FindAllMovie } from '../../infra/repositories/find.all.movie'
import { type queryParamns } from '../../presentation/controllers/find.all.movie.controller'

export class ListMovie {
  constructor (private readonly repository: FindAllMovie) {}

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
