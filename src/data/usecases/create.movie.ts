import { randomUUID } from 'crypto'
import { type MovieProps, Movie } from '../../domain/entities/movie'
import { type SaveMovie } from '../../infra/repositories/save.movie'

export interface newMovie extends MovieProps {
  id: string
}
export class CreateMovie {
  constructor (private readonly repository: SaveMovie) {}

  public async perform (props: MovieProps): Promise<Movie> {
    const newMovie: newMovie = {
      id: randomUUID(),
      name: props.name,
      synopsis: props.synopsis,
      releaseDate: props.releaseDate,
      inTheaters: props.inTheaters
    }
    await this.repository.save(newMovie)
    return Movie.create(props)
  }
}
