import { type NextFunction, type Request, type Response } from 'express'
import { type Authenticate } from './protocol/authenticate.protocol'
import { type JwtPayload } from 'jsonwebtoken'
import { makeLog } from '../../main/factories/adapter.factory'

export interface CustomRequest extends Request {
  decoded: JwtPayload
}

export default function makeAuthMiddleware (auth: Authenticate) {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization
    if (typeof authToken === 'undefined') {
      await makeLog().execute('error', 'user try access route without be logged')
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
        await makeLog().execute('error', 'user try access route with wrong token')
        return res.status(401).json({ error: error.message })
      }
      await makeLog().execute('crit', 'auth middleware throws', { req }, new Error(error))
      return res.status(500).json({ error: 'internal server error' })
    }
  }
}
