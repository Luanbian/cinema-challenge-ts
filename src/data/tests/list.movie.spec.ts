import { makeFindAllMoviesStub } from '../../infra/mocks/find.all.movies.mock'
import { type IfindAllMovies } from '../../infra/protocols/find.all.movies.protocols'
import { type queryParamns, type IlistMovie } from '../protocols/list.movie.protocol'
import { ListMovie } from '../usecases/list.movie'

interface sutTypes {
  sut: IlistMovie
  repositoryStub: IfindAllMovies
}

const makeSut = (): sutTypes => {
  const repositoryStub = makeFindAllMoviesStub()
  const sut = new ListMovie(repositoryStub)
  return { sut, repositoryStub }
}

describe('ListMovie', () => {
  test('should list movies', async () => {
    const { sut } = makeSut()
    const movies = await sut.perform({ column: 'name', type: 'asc', limit: '100', page: '1' })
    expect(movies).toEqual({
      result: [
        {
          id: 'any_id_1',
          name: 'any_name_1',
          synopsis: 'any_synopsis_1',
          releaseDate: new Date('01/11/2023'),
          inTheaters: true
        },
        {
          id: 'any_id_2',
          name: 'any_name_2',
          synopsis: 'any_synopsis_2',
          releaseDate: new Date('02/11/2023'),
          inTheaters: false
        }
      ],
      length: 2,
      hasMore: false
    })
  })
  test('should call repository with passed values', async () => {
    const { sut, repositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(repositoryStub, 'findAll')
    const paramns: queryParamns = {
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1'
    }
    await sut.perform(paramns)
    expect(repositorySpy).toHaveBeenCalledWith(paramns)
  })
  test('should call repository with default values', async () => {
    const { sut, repositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(repositoryStub, 'findAll')
    const paramns: queryParamns = {
      column: undefined,
      type: undefined,
      limit: undefined,
      page: undefined
    }
    await sut.perform(paramns)
    expect(repositorySpy).toHaveBeenCalledWith({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1'
    })
  })
})
