import { type IlistMovie } from '../../../data/protocols/list.movie.protocol'
import { type Movie } from '../../../domain/entities/movie'
import { FindAllMovieController, type queryParamns } from '../find.all.movie.controller'

interface SutTypes {
  sut: FindAllMovieController
  list: IlistMovie
}

const makeListMock = (): IlistMovie => {
  class ListMock implements IlistMovie {
    public async perform (paramns: queryParamns): Promise<{
      result: Movie[]
      length: number
      hasMore: boolean
    }> {
      return {
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
      }
    }
  }
  return new ListMock()
}
const makeSut = (): SutTypes => {
  const list = makeListMock()
  const sut = new FindAllMovieController(list)
  return { sut, list }
}

describe('FindAllMovieController', () => {
  test('should return status 200 if call list sucessfully', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ column: 'name', type: 'asc', limit: '100', page: '1' })
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
    const response = await sut.handle({ column: 'name', type: 'asc', limit: '100', page: '1' })
    expect(response.statusCode).toBe(204)
  })
  test('should return statusCode 500 if controller throws', async () => {
    const { sut, list } = makeSut()
    jest.spyOn(list, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle({ column: 'name', type: 'asc', limit: '100', page: '1' })
    expect(httpResponse?.statusCode).toBe(500)
  })
})
