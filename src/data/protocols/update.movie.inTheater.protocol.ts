import { type after } from '../../infra/protocols/alter.movie.inTheater.protocol'
import { type idParam } from '../../presentation/controllers/update.movie.inTheater.controller'

export interface IupdateMovieInTheater {
  perform: (id: idParam) => Promise<after | null>
}
