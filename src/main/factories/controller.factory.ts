import { type Controller } from '../../@types/controller'
import { type movieDto } from '../../data/usecases/create.movie'
import { AddMovieController } from '../../presentation/controllers/add.movie.controller'
import { FindAllEmployerController } from '../../presentation/controllers/find.all.employer.controller'
import { FindAllMovieController, type queryParamns } from '../../presentation/controllers/find.all.movie.controller'
import { makeCreateMovie, makeListMovie } from './usecase.factory'

export const makeAddController = (): Controller<movieDto> => {
  const create = makeCreateMovie()
  return new AddMovieController(create)
}

export const makeFindAllController = (): Controller<queryParamns> => {
  const list = makeListMovie()
  return new FindAllMovieController(list)
}

export const makeFindAllEmployerController = (): Controller<null> => {
  return new FindAllEmployerController()
}
