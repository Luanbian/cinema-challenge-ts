import { type JwtPayload } from 'jsonwebtoken'
import { type Employer } from '../../domain/entities/employer'

export interface Authenticate {
  generateToken: (user: Employer) => Promise<string>
  verifyToken: (token: string) => Promise<string | JwtPayload>
}
