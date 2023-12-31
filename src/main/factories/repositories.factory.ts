import { type IalterMovieInTheater } from '../../infra/protocols/alter.movie.inTheater.protocol'
import { type IfindAllEmployers } from '../../infra/protocols/find.all.employers.protocols'
import { type IfindAllMovies } from '../../infra/protocols/find.all.movies.protocols'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type IsaveEmployers } from '../../infra/protocols/save.employers.protocols'
import { type IsaveMovies } from '../../infra/protocols/save.movies.protocols'
import { type IupdatePassword } from '../../infra/protocols/update.password.protocol'
import { type IupdatePasswordToken } from '../../infra/protocols/update.passwordToken.protocol'
import { AlterMovieInTheater } from '../../infra/repositories/alter.movie.inTheater'
import { UpdatePassword } from '../../infra/repositories/alter.password'
import { UpdatePasswordToken } from '../../infra/repositories/alter.passwordToken'
import { FindAllEmployer } from '../../infra/repositories/find.all.employer'
import { FindAllMovie } from '../../infra/repositories/find.all.movie'
import { FindUserByAuth } from '../../infra/repositories/find.user.by.auth'
import { SaveEmployer } from '../../infra/repositories/save.employer'
import { SaveMovie } from '../../infra/repositories/save.movie'

export const makeSaveMovie = (): IsaveMovies => {
  return new SaveMovie()
}

export const makeFindAllMovie = (): IfindAllMovies => {
  return new FindAllMovie()
}

export const makeFindAllEmployer = (): IfindAllEmployers => {
  return new FindAllEmployer()
}

export const makeSaveEmployer = (): IsaveEmployers => {
  return new SaveEmployer()
}

export const makeAlterMovieInTheater = (): IalterMovieInTheater => {
  return new AlterMovieInTheater()
}

export const makeFindUserByAuth = (): IfindUserByAuth => {
  return new FindUserByAuth()
}

export const makeUpdatePassword = (): IupdatePassword => {
  return new UpdatePassword()
}

export const makeUpdatePasswordToken = (): IupdatePasswordToken => {
  return new UpdatePasswordToken()
}
