import { makeAlterMovieInTheaterStub } from '../../infra/mocks/alter.movie.inTheater.mock'
import { type IalterMovieInTheater } from '../../infra/protocols/alter.movie.inTheater.protocol'
import { type IupdateMovieInTheater } from '../protocols/update.movie.inTheater.protocol'
import { UpdateMovieInTheater } from '../usecases/update.movie.inTheater'

interface SutProps {
  sut: IupdateMovieInTheater
  repository: IalterMovieInTheater
}

const makeSut = (): SutProps => {
  const repository = makeAlterMovieInTheaterStub()
  const sut = new UpdateMovieInTheater(repository)
  return { sut, repository }
}

describe('UpdateMovieInTheater', () => {
  test('should call repository with correct value', async () => {
    const { sut, repository } = makeSut()
    const repoSpy = jest.spyOn(repository, 'alter')
    await sut.perform('id_movie')
    expect(repoSpy).toHaveBeenCalledWith('id_movie')
  })
  test('should return null if id not exist', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'alter').mockImplementationOnce(async () => {
      return null
    })
    const id = 'invalid_id'
    const usecase = await sut.perform(id)
    expect(usecase).toBe(null)
  })
  test('should return after object if updated with success', async () => {
    const { sut } = makeSut()
    const id = 'valid_id'
    const usecase = await sut.perform(id)
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
})
