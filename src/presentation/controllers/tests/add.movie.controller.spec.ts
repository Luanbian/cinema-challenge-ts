import { type IcreateMovie } from '../../../data/protocols/create.movie.protocol'
import { type movieDto } from '../../../data/usecases/create.movie'
import { type Movie } from '../../../domain/entities/movie'
import { AddMovieController } from '../add.movie.controller'

interface SutTypes {
  sut: AddMovieController
  createMovieMock: IcreateMovie
}

const makeCreateMock = (): IcreateMovie => {
  class CreateMovieMock implements IcreateMovie {
    public async perform (props: movieDto): Promise<Movie> {
      const fakeMovie: Movie = {
        id: 'fake_id',
        name: 'fake_name',
        synopsis: 'fake_synopsis',
        releaseDate: new Date(),
        inTheaters: true
      }
      return fakeMovie
    }
  }
  return new CreateMovieMock()
}

const makeSut = (): SutTypes => {
  const createMovieMock = makeCreateMock()
  const sut = new AddMovieController(createMovieMock)
  return { sut, createMovieMock }
}

describe('AddMovieController', () => {
  test('should return statusCode 201 and movie entity if success', async () => {
    const { sut } = makeSut()
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
