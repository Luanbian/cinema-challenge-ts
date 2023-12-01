import { type after } from '../../infra/protocols/alter.movie.inTheater.protocol'

export interface IupdateMovieInTheater {
  perform: (id: string) => Promise<after | null>
}
