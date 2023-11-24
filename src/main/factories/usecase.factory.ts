import { type IcreateMovie } from '../../data/protocols/create.movie.protocol'
import { type IlistEmployer } from '../../data/protocols/list.employer.protocol'
import { type IlistMovie } from '../../data/protocols/list.movie.protocol'
import { CreateMovie } from '../../data/usecases/create.movie'
import { ListEmployer } from '../../data/usecases/list.employer'
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

export const makeListEmployer = (): IlistEmployer => {
  return new ListEmployer()
}
