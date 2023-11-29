import { makeAlterMovieInTheaterStub } from '../../infra/mocks/alter.movie.inTheater.mock'
import { type after, type IalterMovieInTheater } from '../../infra/protocols/alter.movie.inTheater.protocol'
import { type idParam } from '../../presentation/controllers/update.movie.inTheater.controller'
import { type IupdateMovieInTheater } from '../protocols/update.movie.inTheater.protocol'

interface SutProps {
  sut: IupdateMovieInTheater
  repository: IalterMovieInTheater
}

export class UpdateMovieInTheater implements IupdateMovieInTheater {
  constructor (private readonly repository: IalterMovieInTheater) {}

  public async perform ({ id }: idParam): Promise<after | null> {
    const repo = await this.repository.alter(id)
    return repo
  }
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
    await sut.perform({ id: 'id_movie' })
    expect(repoSpy).toHaveBeenCalledWith('id_movie')
  })
})
