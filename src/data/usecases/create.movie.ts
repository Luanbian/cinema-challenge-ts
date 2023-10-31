import { randomUUID } from 'crypto'
import { type MovieProps, Movie } from '../../domain/entities/movie'

export interface newMovie extends MovieProps {
  id: string
}
export class CreateMovie {
  public async perform (props: MovieProps): Promise<Movie> {
    const newMovie: newMovie = {
      id: randomUUID(),
      name: props.name,
      synopsis: props.synopsis,
      releaseDate: props.releaseDate,
      inTheaters: props.inTheaters
    }
    return Movie.create(props)
  }
}
