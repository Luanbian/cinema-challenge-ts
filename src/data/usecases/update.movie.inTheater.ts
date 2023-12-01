import { type after, type IalterMovieInTheater } from '../../infra/protocols/alter.movie.inTheater.protocol'
import { type IupdateMovieInTheater } from '../protocols/update.movie.inTheater.protocol'

export class UpdateMovieInTheater implements IupdateMovieInTheater {
  constructor (private readonly repository: IalterMovieInTheater) {}

  public async perform (id: string): Promise<after | null> {
    const repo = await this.repository.alter(id)
    return repo
  }
}
