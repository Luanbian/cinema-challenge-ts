import { CreateMovie } from '../../data/usecases/create.movie'

export const makeCreateMovie = (): CreateMovie => {
  return new CreateMovie()
}
