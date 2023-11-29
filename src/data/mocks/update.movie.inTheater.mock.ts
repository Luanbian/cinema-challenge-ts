import { type idParam } from '../../presentation/controllers/update.movie.inTheater.controller'
import { type IupdateMovieInTheater } from '../protocols/update.movie.inTheater.protocol'

export const makeUpdateMock = (): IupdateMovieInTheater => {
  class UpdateMovieInTheater implements IupdateMovieInTheater {
    public async perform ({ id }: idParam): Promise<string | null> {
      return `updated item ${id}`
    }
  }
  return new UpdateMovieInTheater()
}
