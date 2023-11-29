import { type after, type IalterMovieInTheater } from '../protocols/alter.movie.inTheater.protocol'

export const makeAlterMovieInTheaterStub = (): IalterMovieInTheater => {
  class AlterMovieInTheater implements IalterMovieInTheater {
    public async alter (data: string): Promise<after | null> {
      return {
        action: 'update',
        after: {
          id: 'id_movie',
          name: 'any_movie',
          synopsis: 'any_sinopsys',
          inTheaters: false,
          releaseDate: new Date('01/11/2023')
        }
      }
    }
  }
  return new AlterMovieInTheater()
}
