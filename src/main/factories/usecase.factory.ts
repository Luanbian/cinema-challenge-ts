import { type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { type IcreateMovie } from '../../data/protocols/create.movie.protocol'
import { type IForgotPassword } from '../../data/protocols/forgot.password.protocol'
import { type IlistEmployer } from '../../data/protocols/list.employer.protocol'
import { type IlistMovie } from '../../data/protocols/list.movie.protocol'
import { type Ilogin } from '../../data/protocols/login.employer.protocol'
import { type IredefinePassword } from '../../data/protocols/redefine.password.protocol'
import { type IupdateMovieInTheater } from '../../data/protocols/update.movie.inTheater.protocol'
import { CreateEmployer } from '../../data/usecases/create.employer'
import { CreateMovie } from '../../data/usecases/create.movie'
import { ForgotPassword } from '../../data/usecases/forgot.password'
import { ListEmployer } from '../../data/usecases/list.employer'
import { ListMovie } from '../../data/usecases/list.movie'
import { LoginEmployer } from '../../data/usecases/login.employer'
import { RedefinePassword } from '../../data/usecases/redefine.password'
import { UpdateMovieInTheater } from '../../data/usecases/update.movie.inTheater'
import { makeAuthenticateAdapter, makeEncrypterAdapter } from './adapter.factory'
import { makeAlterMovieInTheater, makeFindAllEmployer, makeFindAllMovie, makeFindUserByAuth, makeSaveEmployer, makeSaveMovie, makeUpdatePassword, makeUpdatePasswordToken } from './repositories.factory'

export const makeCreateMovie = (): IcreateMovie => {
  const repository = makeSaveMovie()
  return new CreateMovie(repository)
}

export const makeListMovie = (): IlistMovie => {
  const repository = makeFindAllMovie()
  return new ListMovie(repository)
}

export const makeListEmployer = (): IlistEmployer => {
  const repository = makeFindAllEmployer()
  return new ListEmployer(repository)
}

export const makeCreateEmployer = (): IcreateEmployer => {
  const repository = makeSaveEmployer()
  const encrypter = makeEncrypterAdapter()
  return new CreateEmployer(repository, encrypter)
}

export const makeUpdateMovieInTheater = (): IupdateMovieInTheater => {
  const repository = makeAlterMovieInTheater()
  return new UpdateMovieInTheater(repository)
}

export const makeLoginEmployer = (): Ilogin => {
  const repository = makeFindUserByAuth()
  const encrypter = makeEncrypterAdapter()
  const auth = makeAuthenticateAdapter()
  return new LoginEmployer(repository, encrypter, auth)
}

export const makeForgotPassword = (): IForgotPassword => {
  const repository = makeFindUserByAuth()
  const reset = makeUpdatePasswordToken()
  return new ForgotPassword(repository, reset)
}

export const makeRedefinePassword = (): IredefinePassword => {
  const user = makeFindUserByAuth()
  const encrypter = makeEncrypterAdapter()
  const password = makeUpdatePassword()
  return new RedefinePassword(user, encrypter, password)
}
