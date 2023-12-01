import { type Controller } from '../../@types/controller'
import { AddEmployerController, type AddEmployerControllerProps } from '../../presentation/controllers/add.employer.controller'
import { AddMovieController, type AddMovieControllerProps } from '../../presentation/controllers/add.movie.controller'
import { FindAllEmployerController, type FindAllEmployerControllerProps } from '../../presentation/controllers/find.all.employer.controller'
import { FindAllMovieController, type FindAllMovieControllerProps } from '../../presentation/controllers/find.all.movie.controller'
import { type LoginEmployerControllerProps, LoginEmployerController } from '../../presentation/controllers/login.employer.controller'
import { UpdateMovieInTheaterController, type idParam } from '../../presentation/controllers/update.movie.inTheater.controller'
import { makeCreateEmployer, makeCreateMovie, makeListEmployer, makeListMovie, makeLoginEmployer, makeUpdateMovieInTheater } from './usecase.factory'

export const makeAddMoviesController = (): Controller<AddMovieControllerProps> => {
  const create = makeCreateMovie()
  return new AddMovieController(create)
}

export const makeFindAllMoviesController = (): Controller<FindAllMovieControllerProps> => {
  const list = makeListMovie()
  return new FindAllMovieController(list)
}

export const makeFindAllEmployersController = (): Controller<FindAllEmployerControllerProps> => {
  const list = makeListEmployer()
  return new FindAllEmployerController(list)
}

export const makeAddEmployerController = (): Controller<AddEmployerControllerProps> => {
  const create = makeCreateEmployer()
  return new AddEmployerController(create)
}

export const makeUpdateMovieInTheaterController = (): Controller<idParam> => {
  const update = makeUpdateMovieInTheater()
  return new UpdateMovieInTheaterController(update)
}

export const makeLoginEmployerController = (): Controller<LoginEmployerControllerProps> => {
  const login = makeLoginEmployer()
  return new LoginEmployerController(login)
}
