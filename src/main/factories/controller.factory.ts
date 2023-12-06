import { type Controller } from '../../@types/controller'
import { AddEmployerController, type AddEmployerControllerProps } from '../../presentation/controllers/add.employer.controller'
import { AddMovieController, type AddMovieControllerProps } from '../../presentation/controllers/add.movie.controller'
import { FindAllEmployerController, type FindAllEmployerControllerProps } from '../../presentation/controllers/find.all.employer.controller'
import { FindAllMovieController, type FindAllMovieControllerProps } from '../../presentation/controllers/find.all.movie.controller'
import { ForgotPasswordController, type ForgotPasswordControllerProps } from '../../presentation/controllers/forgot.password.controller'
import { type LoginEmployerControllerProps, LoginEmployerController } from '../../presentation/controllers/login.employer.controller'
import { RedefinePasswordController, type RedefinePasswordControllerProps } from '../../presentation/controllers/redefine.password.controller'
import { UpdateMovieInTheaterController, type UpdateMovieInTheaterControllerProps } from '../../presentation/controllers/update.movie.inTheater.controller'
import { makeCreateEmployer, makeCreateMovie, makeForgotPassword, makeListEmployer, makeListMovie, makeLoginEmployer, makeRedefinePassword, makeUpdateMovieInTheater } from './usecase.factory'

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

export const makeUpdateMovieInTheaterController = (): Controller<UpdateMovieInTheaterControllerProps> => {
  const update = makeUpdateMovieInTheater()
  return new UpdateMovieInTheaterController(update)
}

export const makeLoginEmployerController = (): Controller<LoginEmployerControllerProps> => {
  const login = makeLoginEmployer()
  return new LoginEmployerController(login)
}

export const makeForgotPasswordController = (): Controller<ForgotPasswordControllerProps> => {
  const passwordToken = makeForgotPassword()
  return new ForgotPasswordController(passwordToken)
}

export const makeRedefinePasswordController = (): Controller<RedefinePasswordControllerProps> => {
  const redefine = makeRedefinePassword()
  return new RedefinePasswordController(redefine)
}
