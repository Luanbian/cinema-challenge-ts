import { type MovieProps, Movie } from '../../domain/entities/movie'

export class CreateMovie {
  public async perform (props: MovieProps): Promise<Movie> {
    return Movie.create(props)
  }
}
