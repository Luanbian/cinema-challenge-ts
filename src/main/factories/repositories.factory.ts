import { type IfindAllEmployers } from '../../infra/protocols/find.all.employers.protocols'
import { type IfindAllMovies } from '../../infra/protocols/find.all.movies.protocols'
import { type IsaveMovies } from '../../infra/protocols/save.movies.protocols'
import { FindAllEmployer } from '../../infra/repositories/find.all.employer'
import { FindAllMovie } from '../../infra/repositories/find.all.movie'
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
