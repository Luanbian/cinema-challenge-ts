/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import makeRoute from '../adapters/express.adapter'
import { makeAddController } from '../factories/controller.factory'

export default (router: Router): void => {
  router.get('/api/home', makeRoute(makeAddController()))
}
