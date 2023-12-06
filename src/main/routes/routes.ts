/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import makeRoute from '../adapters/express.adapter'
import { makeAddEmployerController, makeAddMoviesController, makeFindAllEmployersController, makeFindAllMoviesController, makeForgotPasswordController, makeLoginEmployerController, makeRedefinePasswordController, makeUpdateMovieInTheaterController } from '../factories/controller.factory'
import { handleValidation, validateEmail, validateEmployerInput, validateLoginInput, validateMovieInput, validateResetPass } from '../../middleware/validator'
import makeAuthMiddleware from '../../middleware/auth/auth.middleware'
import { makeAuthenticateAdapter } from '../factories/adapter.factory'

const auth = makeAuthMiddleware(makeAuthenticateAdapter())
export default (router: Router): void => {
  router.post('/api/movies', auth, validateMovieInput, handleValidation, makeRoute(makeAddMoviesController()))
  router.get('/api/movies', auth, makeRoute(makeFindAllMoviesController()))
  router.put('/api/movies/:id', auth, makeRoute(makeUpdateMovieInTheaterController()))

  router.get('/api/employers', auth, makeRoute(makeFindAllEmployersController()))
  router.post('/api/employers', auth, validateEmployerInput, handleValidation, makeRoute(makeAddEmployerController()))

  router.post('/api/login', validateLoginInput, handleValidation, makeRoute(makeLoginEmployerController()))
  router.post('/api/forgotPassword', validateEmail, handleValidation, makeRoute(makeForgotPasswordController()))
  router.post('/api/resetPassword', validateResetPass, handleValidation, makeRoute(makeRedefinePasswordController()))
}
