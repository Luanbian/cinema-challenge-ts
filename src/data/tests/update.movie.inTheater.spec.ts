import { type Movie } from '../../domain/entities/movie'
import { type idParam } from '../../presentation/controllers/update.movie.inTheater.controller'
import { type IupdateMovieInTheater } from '../protocols/update.movie.inTheater.protocol'

interface SutProps {
  sut: IupdateMovieInTheater
  repository: IalterMovieInTheater
}

export interface after {
  action: string
  after: Movie
}

export interface IalterMovieInTheater {
  alter: (data: string) => Promise<after | null>
}

export const makeAlterMovieInTheaterStub = (): IalterMovieInTheater => {
  class AlterMovieInTheater implements IalterMovieInTheater {
    public async alter (data: string): Promise<after | null> {
      return {
        action: 'update',
        after: {
          id: 'id_movie',
          name: 'any_movie',
          synopsis: 'any_sinopsys',
          inTheaters: false,
          releaseDate: new Date('01/11/2023')
        }
      }
    }
  }
  return new AlterMovieInTheater()
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
