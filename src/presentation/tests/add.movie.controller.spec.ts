import { makeCreateMock } from '../../data/mocks/create.movie.mock'
import { type IcreateMovie } from '../../data/protocols/create.movie.protocol'
import { type movieDto } from '../../data/usecases/create.movie'
import { AddMovieController } from '../controllers/add.movie.controller'

interface SutTypes {
  sut: AddMovieController
  createMovieMock: IcreateMovie
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
      name: 'any_name',
      synopsis: 'any_synopsis',
      releaseDate: '01/11/2023',
      inTheaters: true
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
  test('should return statusCode 500 if controller throws', async () => {
    const { sut, createMovieMock } = makeSut()
    jest.spyOn(createMovieMock, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const input: movieDto = {
      name: 'any_name',
      synopsis: 'any_synopsis',
      releaseDate: '01/11/2023',
      inTheaters: true
    }
    const httpResponse = await sut.handle(input)
    expect(httpResponse?.statusCode).toBe(500)
  })
})
