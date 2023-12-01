import { type Movie } from '../../domain/entities/movie'
import { type FindAllMovieControllerProps } from '../../presentation/controllers/find.all.movie.controller'
import { type IlistMovie } from '../protocols/list.movie.protocol'

export const makeListMock = (): IlistMovie => {
  class ListMock implements IlistMovie {
    public async perform (paramns: FindAllMovieControllerProps): Promise<{
      result: Movie[]
      length: number
      hasMore: boolean
    }> {
      return {
        result: [
          {
            id: 'any_id_1',
            name: 'any_name_1',
            synopsis: 'any_synopsis_1',
            releaseDate: new Date('01/11/2023'),
            inTheaters: true
          },
          {
            id: 'any_id_2',
            name: 'any_name_2',
            synopsis: 'any_synopsis_2',
            releaseDate: new Date('02/11/2023'),
            inTheaters: false
          }
        ],
        length: 2,
        hasMore: false
      }
    }
  }
  return new ListMock()
}
