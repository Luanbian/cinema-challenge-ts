import { type Movie } from '../../domain/entities/movie'

export interface after {
  action: string
  after: Movie
}

export interface IalterMovieInTheater {
  alter: (id: string) => Promise<after | null>
}
