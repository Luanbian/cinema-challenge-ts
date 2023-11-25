import { BcryptAdapter } from '../../data/criptography/bcrypt.adapter'
import { type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { type IcreateMovie } from '../../data/protocols/create.movie.protocol'
import { type IlistEmployer } from '../../data/protocols/list.employer.protocol'
import { type IlistMovie } from '../../data/protocols/list.movie.protocol'
import { CreateEmployer } from '../../data/usecases/create.employer'
import { CreateMovie } from '../../data/usecases/create.movie'
import { ListEmployer } from '../../data/usecases/list.employer'
import { ListMovie } from '../../data/usecases/list.movie'
import { makeFindAllEmployer, makeFindAllMovie, makeSaveEmployer, makeSaveMovie } from './repositories.factory'

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
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  return new CreateEmployer(repository, encrypter)
}
