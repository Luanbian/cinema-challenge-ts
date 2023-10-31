import { randomUUID } from 'crypto'
import { type MovieProps, Movie } from '../../domain/entities/movie'
import { type SaveMovie } from '../../infra/repositories/save.movie'
import moment from 'moment'

export class CreateMovie {
  constructor (private readonly repository: SaveMovie) {}

  public async perform (props: MovieProps): Promise<Movie> {
    const newMovie: MovieProps = {
      id: randomUUID(),
      name: props.name,
      synopsis: props.synopsis,
      releaseDate: moment(props.releaseDate, 'DD/MM/YYYY').toDate(),
      inTheaters: props.inTheaters
    }
    await this.repository.save(newMovie)
    return Movie.create(newMovie)
  }
}
