/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import makeRoute from '../adapters/express.adapter'
import { makeAddEmployerController, makeAddMoviesController, makeFindAllEmployersController, makeFindAllMoviesController, makeUpdateMovieInTheaterController } from '../factories/controller.factory'
import { handleValidation, validateEmployerInput, validateMovieInput } from '../../middleware/validator'

export default (router: Router): void => {
  router.post('/api/movies', validateMovieInput, handleValidation, makeRoute(makeAddMoviesController()))
  router.get('/api/movies', makeRoute(makeFindAllMoviesController()))
  router.put('/api/movies/:id', makeRoute(makeUpdateMovieInTheaterController()))

  router.get('/api/employers', makeRoute(makeFindAllEmployersController()))
  router.post('/api/employers', validateEmployerInput, handleValidation, makeRoute(makeAddEmployerController()))
}
