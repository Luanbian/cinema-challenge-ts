import { type Movie } from '../../domain/entities/movie'
import { type IcreateMovie } from '../protocols/create.movie.protocol'
import { type movieDto } from '../usecases/create.movie'

export const makeCreateMovieMock = (): IcreateMovie => {
  class CreateMovieMock implements IcreateMovie {
    public async perform (props: movieDto): Promise<Movie> {
      const fakeMovie: Movie = {
        id: 'fake_id',
        name: 'fake_name',
        synopsis: 'fake_synopsis',
        releaseDate: new Date('01/11/2023'),
        inTheaters: false
      }
      return fakeMovie
    }
  }
  return new CreateMovieMock()
}
