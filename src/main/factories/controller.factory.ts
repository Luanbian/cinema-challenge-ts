import { type Controller } from '../../@types/controller'
import { type EmployerDto } from '../../data/protocols/create.employer.protocol'
import { type movieDto } from '../../data/protocols/create.movie.protocol'
import { AddEmployerController } from '../../presentation/controllers/add.employer.controller'
import { AddMovieController } from '../../presentation/controllers/add.movie.controller'
import { FindAllEmployerController } from '../../presentation/controllers/find.all.employer.controller'
import { FindAllMovieController, type queryParamns } from '../../presentation/controllers/find.all.movie.controller'
import { UpdateMovieInTheaterController, type idParam } from '../../presentation/controllers/update.movie.inTheater.controller'
import { makeCreateEmployer, makeCreateMovie, makeListEmployer, makeListMovie, makeUpdateMovieInTheater } from './usecase.factory'

export const makeAddMoviesController = (): Controller<movieDto> => {
  const create = makeCreateMovie()
  return new AddMovieController(create)
}

export const makeFindAllMoviesController = (): Controller<queryParamns> => {
  const list = makeListMovie()
  return new FindAllMovieController(list)
}

export const makeFindAllEmployersController = (): Controller<null> => {
  const list = makeListEmployer()
  return new FindAllEmployerController(list)
}

export const makeAddEmployerController = (): Controller<EmployerDto> => {
  const create = makeCreateEmployer()
  return new AddEmployerController(create)
}

export const makeUpdateMovieInTheaterController = (): Controller<idParam> => {
  const update = makeUpdateMovieInTheater()
  return new UpdateMovieInTheaterController(update)
}
