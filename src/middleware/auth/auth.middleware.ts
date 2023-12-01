import { type NextFunction, type Request, type Response } from 'express'
import { type Authenticate } from '../../data/protocols/authenticate.protocol'

export default function makeAuthMiddleware (auth: Authenticate) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization
    if (typeof authToken === 'undefined') {
      return res.status(401).json('Token not provided')
    }
    const bearer = authToken.split(' ')
    const token = bearer[1]
    try {
      const decoded = await auth.verifyToken(token)
      console.log(decoded)
      next()
    } catch (error) {
      console.error(error)
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: error.message })
      }
      return res.status(500).json({ error: 'internal server error' })
    }
  }
}
