import { type after } from '../../infra/protocols/alter.movie.inTheater.protocol'
import { type idParam } from '../../presentation/controllers/update.movie.inTheater.controller'
import { type IupdateMovieInTheater } from '../protocols/update.movie.inTheater.protocol'

export const makeUpdateMock = (): IupdateMovieInTheater => {
  class UpdateMovieInTheater implements IupdateMovieInTheater {
    public async perform ({ id }: idParam): Promise<after | null> {
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
  return new UpdateMovieInTheater()
}
