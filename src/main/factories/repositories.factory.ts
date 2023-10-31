import { FindAllMovie } from '../../infra/repositories/find.all.movie'
import { SaveMovie } from '../../infra/repositories/save.movie'

export const makeSaveMovie = (): SaveMovie => {
  return new SaveMovie()
}

export const makeFindAllMovie = (): FindAllMovie => {
  return new FindAllMovie()
}
