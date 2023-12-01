import jwt, { type JwtPayload } from 'jsonwebtoken'
import { type Authenticate } from '../../data/protocols/authenticate.protocol'
import { type Employer } from '../../domain/entities/employer'

export class JwtAdapter implements Authenticate {
  constructor (private readonly secret: string) {}

  public async generateToken (user: Employer): Promise<string> {
    const token = jwt.sign(user, this.secret)
    return token
  }

  public async verifyToken (token: string): Promise<string | JwtPayload> {
    const decoded = jwt.verify(token, this.secret)
    return decoded
  }
}
