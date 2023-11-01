import { type IcreateMovie } from '../../data/protocols/create.movie.protocol'
import { type IlistMovie } from '../../data/protocols/list.movie.protocol'
import { CreateMovie } from '../../data/usecases/create.movie'
import { ListMovie } from '../../data/usecases/list.movie'
import { makeFindAllMovie, makeSaveMovie } from './repositories.factory'

export const makeCreateMovie = (): IcreateMovie => {
  const repository = makeSaveMovie()
  return new CreateMovie(repository)
}

export const makeListMovie = (): IlistMovie => {
  const repository = makeFindAllMovie()
  return new ListMovie(repository)
}
