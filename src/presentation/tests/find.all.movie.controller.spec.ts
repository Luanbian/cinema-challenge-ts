import { makeListMock } from '../../data/mocks/list.movie.mock'
import { type IlistMovie } from '../../data/protocols/list.movie.protocol'
import { FindAllMovieController } from '../controllers/find.all.movie.controller'

interface SutTypes {
  sut: FindAllMovieController
  list: IlistMovie
}

const makeSut = (): SutTypes => {
  const list = makeListMock()
  const sut = new FindAllMovieController(list)
  return { sut, list }
}

describe('FindAllMovieController', () => {
  test('should return status 200 if call list sucessfully if logged user be admin', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1',
      loggedUser: {
        role: 'ADMIN'
      }
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      content: [{
        id: 'any_id_1',
        inTheaters: true,
        name: 'any_name_1',
        releaseDate: new Date('01/11/2023'),
        synopsis: 'any_synopsis_1'
      }, {
        id: 'any_id_2',
        inTheaters: false,
        name: 'any_name_2',
        releaseDate: new Date('02/11/2023'),
        synopsis: 'any_synopsis_2'
      }],
      hasMore: false,
      length: 2,
      limit: '100',
      page: '1'
    })
  })
  test('should return status 200 if call list sucessfully if logged user be consulter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1',
      loggedUser: {
        role: 'CONSULTER'
      }
    })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      content: [{
        id: 'any_id_1',
        inTheaters: true,
        name: 'any_name_1',
        releaseDate: new Date('01/11/2023'),
        synopsis: 'any_synopsis_1'
      }, {
        id: 'any_id_2',
        inTheaters: false,
        name: 'any_name_2',
        releaseDate: new Date('02/11/2023'),
        synopsis: 'any_synopsis_2'
      }],
      hasMore: false,
      length: 2,
      limit: '100',
      page: '1'
    })
  })
  test('should return 204 if call list with no content', async () => {
    const { sut, list } = makeSut()
    jest.spyOn(list, 'perform').mockImplementationOnce(async () => {
      return {
        result: [],
        length: 0,
        hasMore: false
      }
    })
    const httpResponse = await sut.handle({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1',
      loggedUser: {
        role: 'ADMIN'
      }
    })
    expect(httpResponse.statusCode).toBe(204)
  })
  test('should return 401 unauthorized if logged user be cadastrer', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1',
      loggedUser: {
        role: 'CADASTRER'
      }
    })
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if logged user be manager', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1',
      loggedUser: {
        role: 'MANAGER'
      }
    })
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if logged user be trainee', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1',
      loggedUser: {
        role: 'TRAINEE'
      }
    })
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if user not be logged', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1',
      loggedUser: {
        role: undefined
      }
    })
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return statusCode 500 if controller throws', async () => {
    const { sut, list } = makeSut()
    jest.spyOn(list, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle({
      column: 'name',
      type: 'asc',
      limit: '100',
      page: '1',
      loggedUser: {
        role: 'ADMIN'
      }
    })
    expect(httpResponse?.statusCode).toBe(500)
  })
})
