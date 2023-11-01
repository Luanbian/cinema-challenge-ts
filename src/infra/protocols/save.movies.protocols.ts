import { type Movie } from '../../domain/entities/movie'

export interface IsaveMovies {
  save: (data: Movie) => Promise<void>
}
