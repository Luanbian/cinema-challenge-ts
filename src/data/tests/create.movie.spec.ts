import { parse } from 'date-fns'
import { type Movie } from '../../domain/entities/movie'
import { type IsaveMovies } from '../../infra/protocols/save.movies.protocols'
import { type IcreateMovie } from '../protocols/create.movie.protocol'
import { CreateMovie } from '../usecases/create.movie'

interface sutTypes {
  sut: IcreateMovie
  repositoryStub: IsaveMovies
}

const makeSaveMoviesStub = (): IsaveMovies => {
  class SaveMoviesStub implements IsaveMovies {
    public async save (data: Movie): Promise<void> {}
  }
  return new SaveMoviesStub()
}

const makeSut = (): sutTypes => {
  const repositoryStub = makeSaveMoviesStub()
  const sut = new CreateMovie(repositoryStub)
  return { sut, repositoryStub }
}

describe('CreateMovie', () => {
  test('should return a Movie Entity', async () => {
    const { sut } = makeSut()
    const input = {
      name: 'any_name',
      synopsis: 'any_synopsis',
      releaseDate: '01/11/2023',
      inTheaters: true
    }
    const movie = await sut.perform(input)
    expect(movie).toEqual({
      id: movie.id,
      name: 'any_name',
      synopsis: 'any_synopsis',
      releaseDate: parse(input.releaseDate, 'dd/MM/yyyy', new Date()),
      inTheaters: true
    })
  })
})
