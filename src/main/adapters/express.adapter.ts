import { type Response } from 'express'
import { type Controller } from '../../@types/controller'
import { type CustomRequest } from '../../middleware/auth/auth.middleware'

export default function makeRoute<T> (controller: Controller<T>) {
  return async (req: CustomRequest, res: Response) => {
    try {
      const { body, statusCode } = await controller.handle({
        ...req.body,
        ...req.params,
        ...req.query,
        ...req.headers,
        ...req.decoded
      })
      return res.status(statusCode).json(body)
    } catch (error) {
      console.error(error)
      return res.status(500).json('Internal server error')
    }
  }
}
