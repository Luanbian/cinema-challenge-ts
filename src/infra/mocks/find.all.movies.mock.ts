import { type IfindAllMovies, type queryProps } from '../protocols/find.all.movies.protocols'

export const makeFindAllMoviesStub = (): IfindAllMovies => {
  class FindAllMoviesStub implements IfindAllMovies {
    public async findAll (paramns: queryProps): Promise<{
      result: Array<{
        id: string
        name: string
        synopsis: string
        releaseDate: Date
        inTheaters: boolean
      }>
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
  return new FindAllMoviesStub()
}
