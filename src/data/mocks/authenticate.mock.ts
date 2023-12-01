import { type JwtPayload } from 'jsonwebtoken'
import { type Employer } from '../../domain/entities/employer'
import { type Authenticate } from '../../middleware/auth/protocol/authenticate.protocol'

export const makeAuthenticateStub = (): Authenticate => {
  class AuthenticateStub implements Authenticate {
    public async generateToken (user: Employer): Promise<string> {
      return await new Promise((resolve, reject) => {
        resolve('token')
      })
    }

    public async verifyToken (token: string): Promise<string | JwtPayload> {
      return {
        sub: 'content-jwt-test',
        exp: 48,
        jti: 'jwt-id'
      }
    }
  }
  return new AuthenticateStub()
}
