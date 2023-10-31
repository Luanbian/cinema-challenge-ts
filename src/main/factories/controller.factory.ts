import { type Controller } from '../../@types/controller'
import { type MovieProps } from '../../domain/entities/movie'
import { AddMovieController } from '../../presentation/controllers/add.movie.controller'
import { makeCreateMovie } from './usecase,factory'

export const makeAddController = (): Controller<MovieProps> => {
  const create = makeCreateMovie()
  return new AddMovieController(create)
}
