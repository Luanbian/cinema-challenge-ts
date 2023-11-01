import { randomUUID } from 'crypto'
import { Movie } from '../../domain/entities/movie'
import { parse } from 'date-fns'
import { type IcreateMovie } from '../protocols/create.movie.protocol'
import { type IsaveMovies } from '../../infra/protocols/save.movies.protocols'

export interface movieDto {
  id: string
  name: string
  synopsis: string
  releaseDate: string
  inTheaters: boolean
}

export class CreateMovie implements IcreateMovie {
  constructor (private readonly repository: IsaveMovies) {}

  public async perform (props: movieDto): Promise<Movie> {
    const movie = Movie.create({
      id: randomUUID(),
      name: props.name,
      synopsis: props.synopsis,
      releaseDate: parse(props.releaseDate, 'dd/MM/yyyy', new Date()),
      inTheaters: props.inTheaters
    })
    await this.repository.save(movie)
    return movie
  }
}
