import { type Controller } from '../../@types/controller'
import { type MovieProps } from '../../domain/entities/movie'
import { AddMovieController } from '../../presentation/controllers/add.movie.controller'
import { FindAllMovieController, type queryParamns } from '../../presentation/controllers/find.all.movie.controller'
import { makeCreateMovie, makeListMovie } from './usecase.factory'

export const makeAddController = (): Controller<MovieProps> => {
  const create = makeCreateMovie()
  return new AddMovieController(create)
}

export const makeFindAllController = (): Controller<queryParamns> => {
  const list = makeListMovie()
  return new FindAllMovieController(list)
}
