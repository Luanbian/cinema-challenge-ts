import { makeCreateMovieMock } from '../../data/mocks/create.movie.mock'
import { type IcreateMovie } from '../../data/protocols/create.movie.protocol'
import { AddMovieController, type AddMovieControllerProps } from '../controllers/add.movie.controller'

interface SutTypes {
  sut: AddMovieController
  createMovieMock: IcreateMovie
}

const makeSut = (): SutTypes => {
  const createMovieMock = makeCreateMovieMock()
  const sut = new AddMovieController(createMovieMock)
  return { sut, createMovieMock }
}

describe('AddMovieController', () => {
  test('should return statusCode 201 and movie entity if logged user be admin with success', async () => {
    const { sut } = makeSut()
    const input: AddMovieControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'any_name',
        synopsis: 'any_synopsis',
        releaseDate: '01/11/2023',
        inTheaters: true
      },
      role: 'ADMIN'
    }
    const httpResponse = await sut.handle(input)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'fake_id',
      name: 'fake_name',
      synopsis: 'fake_synopsis',
      releaseDate: new Date('01/11/2023'),
      inTheaters: false
    })
  })
  test('should return statusCode 201 and movie entity if logged user be cadastrer with success', async () => {
    const { sut } = makeSut()
    const input: AddMovieControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'any_name',
        synopsis: 'any_synopsis',
        releaseDate: '01/11/2023',
        inTheaters: true
      },
      role: 'CADASTRER'
    }
    const httpResponse = await sut.handle(input)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'fake_id',
      name: 'fake_name',
      synopsis: 'fake_synopsis',
      releaseDate: new Date('01/11/2023'),
      inTheaters: false
    })
  })
  test('should return 401 unauthorized if logged user be manager', async () => {
    const { sut } = makeSut()
    const input: AddMovieControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'any_name',
        synopsis: 'any_synopsis',
        releaseDate: '01/11/2023',
        inTheaters: true
      },
      role: 'MANAGER'
    }
    const httpResponse = await sut.handle(input)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if logged user be consulter', async () => {
    const { sut } = makeSut()
    const input: AddMovieControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'any_name',
        synopsis: 'any_synopsis',
        releaseDate: '01/11/2023',
        inTheaters: true
      },
      role: 'CONSULTER'
    }
    const httpResponse = await sut.handle(input)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if logged user be trainee', async () => {
    const { sut } = makeSut()
    const input: AddMovieControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'any_name',
        synopsis: 'any_synopsis',
        releaseDate: '01/11/2023',
        inTheaters: true
      },
      role: 'TRAINEE'
    }
    const httpResponse = await sut.handle(input)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return statusCode 500 if controller throws', async () => {
    const { sut, createMovieMock } = makeSut()
    jest.spyOn(createMovieMock, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const input: AddMovieControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'any_name',
        synopsis: 'any_synopsis',
        releaseDate: '01/11/2023',
        inTheaters: true
      },
      role: 'CADASTRER'
    }
    const httpResponse = await sut.handle(input)
    expect(httpResponse?.statusCode).toBe(500)
  })
})
