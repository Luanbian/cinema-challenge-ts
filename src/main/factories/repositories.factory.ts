import { ListMovie } from '../../infra/repositories/list.movie'
import { SaveMovie } from '../../infra/repositories/save.movie'

export const makeSaveMovie = (): SaveMovie => {
  return new SaveMovie()
}

export const makeListMovie = (): ListMovie => {
  return new ListMovie()
}
