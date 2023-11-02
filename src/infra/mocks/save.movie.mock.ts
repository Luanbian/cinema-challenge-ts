import { type Movie } from '../../domain/entities/movie'
import { type IsaveMovies } from '../protocols/save.movies.protocols'

export const makeSaveMoviesStub = (): IsaveMovies => {
  class SaveMoviesStub implements IsaveMovies {
    public async save (data: Movie): Promise<void> {}
  }
  return new SaveMoviesStub()
}
