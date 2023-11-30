import { type Employer } from '../../domain/entities/employer'
import { type Authenticate } from '../protocols/authenticate.protocol'

export const makeAuthenticateStub = (): Authenticate => {
  class AuthenticateStub implements Authenticate {
    public async generateToken (user: Employer): Promise<string> {
      return await new Promise((resolve, reject) => {
        resolve('token')
      })
    }
  }
  return new AuthenticateStub()
}
