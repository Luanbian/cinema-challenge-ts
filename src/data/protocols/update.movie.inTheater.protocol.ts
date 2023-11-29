import { type idParam } from '../../presentation/controllers/update.movie.inTheater.controller'
import { type after } from '../tests/update.movie.inTheater.spec'

export interface IupdateMovieInTheater {
  perform: (id: idParam) => Promise<after | null>
}
