import { type IcreateMovie } from '../../../data/protocols/create.movie.protocol'
import { type movieDto } from '../../../data/usecases/create.movie'
import { type Movie } from '../../../domain/entities/movie'
import { type IsaveMovies } from '../../../infra/protocols/save.movies.protocols'
import { AddMovieController } from '../add.movie.controller'
import { parse } from 'date-fns'

class SaveMovieStub implements IsaveMovies {
  public async save (data: Movie): Promise<void> {}
}

class CreateMovieMock implements IcreateMovie {
  constructor (private readonly repository: IsaveMovies) {}

  public async perform (props: movieDto): Promise<Movie> {
    const movie: Movie = {
      id: props.id,
      name: props.name,
      synopsis: props.synopsis,
      releaseDate: parse(props.releaseDate, 'dd/MM/yyyy', new Date()),
      inTheaters: props.inTheaters
    }
    return movie
  }
}

describe('AddMovieController', () => {
  test('should return statusCode 201 and movie entity if success', async () => {
    const repo = new SaveMovieStub()
    const create = new CreateMovieMock(repo)
    const sut = new AddMovieController(create)
    const input: movieDto = {
      id: 'any_id',
      name: 'any_name',
      synopsis: 'any_synopsis',
      releaseDate: '01/11/2023',
      inTheaters: true
    }
    const httpResponse = await sut.handle(input)
    expect(httpResponse.statusCode).toBe(201)
  })
})
