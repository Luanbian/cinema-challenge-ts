import { randomUUID } from 'crypto'
import { Movie } from '../../domain/entities/movie'
import { type SaveMovie } from '../../infra/repositories/save.movie'
import { parse } from 'date-fns'

export interface movieDto {
  id: string
  name: string
  synopsis: string
  releaseDate: string
  inTheaters: boolean
}

export class CreateMovie {
  constructor (private readonly repository: SaveMovie) {}

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
