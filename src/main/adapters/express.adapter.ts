import { type Request, type Response } from 'express'
import { type Controller } from '../../@types/controller'

export default function makeRoute<T> (controller: Controller<T>) {
  return async (req: Request, res: Response) => {
    try {
      const { body, statusCode } = await controller.handle({
        ...req.body,
        ...req.params,
        ...req.query
      })
      return res.status(statusCode).json(body)
    } catch (error) {
      console.error(error)
      return res.status(500).json('Internal server error')
    }
  }
}
