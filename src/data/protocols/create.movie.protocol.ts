import { type Movie } from '../../domain/entities/movie'

export interface movieDto {
  id?: string
  name: string
  synopsis: string
  releaseDate: string
  inTheaters: boolean
}

export interface IcreateMovie {
  perform: (props: movieDto) => Promise<Movie>
}
