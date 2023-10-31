/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import makeRoute from '../adapters/express.adapter'
import { makeAddController } from '../factories/controller.factory'
import { handleMovieValidation, validateMovieInput } from '../../middleware/validator'

export default (router: Router): void => {
  router.post('/api/newMovie', validateMovieInput, handleMovieValidation, makeRoute(makeAddController()))
}
