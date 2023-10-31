import { CreateMovie } from '../../data/usecases/create.movie'
import { ListMovie } from '../../data/usecases/list.movie'
import { makeFindAllMovie, makeSaveMovie } from './repositories.factory'

export const makeCreateMovie = (): CreateMovie => {
  const repository = makeSaveMovie()
  return new CreateMovie(repository)
}

export const makeListMovie = (): ListMovie => {
  const repository = makeFindAllMovie()
  return new ListMovie(repository)
}
