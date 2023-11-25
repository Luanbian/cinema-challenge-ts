/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import makeRoute from '../adapters/express.adapter'
import { makeAddMoviesController, makeFindAllEmployersController, makeFindAllMoviesController } from '../factories/controller.factory'
import { handleValidation, validateMovieInput } from '../../middleware/validator'

export default (router: Router): void => {
  router.post('/api/movies', validateMovieInput, handleValidation, makeRoute(makeAddMoviesController()))
  router.get('/api/movies', makeRoute(makeFindAllMoviesController()))

  router.get('/api/employers', makeRoute(makeFindAllEmployersController()))
}
