import { makeUpdateMock } from '../../data/mocks/update.movie.inTheater.mock'
import { type IupdateMovieInTheater } from '../../data/protocols/update.movie.inTheater.protocol'
import { UpdateMovieInTheaterController } from '../controllers/update.movie.inTheater.controller'

interface SutProps {
  sut: UpdateMovieInTheaterController
  update: IupdateMovieInTheater
}

const makeSut = (): SutProps => {
  const update = makeUpdateMock()
  const sut = new UpdateMovieInTheaterController(update)
  return { sut, update }
}

describe('UpdateMovieInTheaterController', () => {
  test('should return status code 200 and after if success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ id: 'valid_id_movie' })
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      action: 'update',
      after: {
        id: 'id_movie',
        name: 'any_movie',
        synopsis: 'any_sinopsys',
        inTheaters: false,
        releaseDate: new Date('01/11/2023')
      }
    })
  })
  test('should call usecase with correct value', async () => {
    const { update } = makeSut()
    const id = 'movie_id'
    const usecase = await update.perform({ id })
    expect(usecase).toEqual({
      action: 'update',
      after: {
        id: 'id_movie',
        name: 'any_movie',
        synopsis: 'any_sinopsys',
        inTheaters: false,
        releaseDate: new Date('01/11/2023')
      }
    })
  })
  test('should return status code 500 if controller throws', async () => {
    const { sut, update } = makeSut()
    jest.spyOn(update, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle({ id: 'movie_id' })
    expect(httpResponse.statusCode).toBe(500)
  })
  test('should return status code 404 if id not found', async () => {
    const { sut, update } = makeSut()
    jest.spyOn(update, 'perform').mockImplementationOnce(async () => {
      return null
    })
    const httpResponse = await sut.handle({ id: 'invalid_id_movie' })
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual('id not found')
  })
})
