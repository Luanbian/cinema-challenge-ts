import { SaveMovie } from '../../infra/repositories/save.movie'

export const makeSaveMovie = (): SaveMovie => {
  return new SaveMovie()
}
