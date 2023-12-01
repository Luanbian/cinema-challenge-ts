import { type Movie } from '../../domain/entities/movie'
import { type IfindAllMovies } from '../../infra/protocols/find.all.movies.protocols'
import { type FindAllMovieControllerProps } from '../../presentation/controllers/find.all.movie.controller'
import { type IlistMovie } from '../protocols/list.movie.protocol'

export class ListMovie implements IlistMovie {
  constructor (private readonly repository: IfindAllMovies) {}

  public async perform ({ content }: FindAllMovieControllerProps): Promise<{
    result: Movie[]
    length: number
    hasMore: boolean
  }> {
    const { result, length, hasMore } = await this.repository.findAll({
      column: content.column ?? 'name',
      type: content.type ?? 'asc',
      limit: content.limit ?? '100',
      page: content.page ?? '1'
    })
    return { result, length, hasMore }
  }
}
