import { type Movie } from '../../domain/entities/movie'
import { type movieDto } from '../usecases/create.movie'

export interface IcreateMovie {
  perform: (props: movieDto) => Promise<Movie>
}
