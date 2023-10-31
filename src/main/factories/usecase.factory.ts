import { CreateMovie } from '../../data/usecases/create.movie'
import { makeSaveMovie } from './repositories.factory'

export const makeCreateMovie = (): CreateMovie => {
  const repository = makeSaveMovie()
  return new CreateMovie(repository)
}
