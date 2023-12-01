import { type NextFunction, type Request, type Response } from 'express'
import { type Authenticate } from './protocol/authenticate.protocol'
import { type JwtPayload } from 'jsonwebtoken'

export interface CustomRequest extends Request {
  decoded: JwtPayload
}

export default function makeAuthMiddleware (auth: Authenticate) {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization
    if (typeof authToken === 'undefined') {
      return res.status(401).json('Token not provided')
    }
    const bearer = authToken.split(' ')
    const token = bearer[1]
    try {
      const decoded = await auth.verifyToken(token)
      req.decoded = decoded as JwtPayload
      next()
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: error.message })
      }
      console.error(error)
      return res.status(500).json({ error: 'internal server error' })
    }
  }
}
