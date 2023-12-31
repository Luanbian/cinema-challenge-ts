import { type LoginEmployerControllerProps } from '../../presentation/controllers/login.employer.controller'
import { type Ilogin } from '../protocols/login.employer.protocol'

export const makeLoginMock = (): Ilogin => {
  class LoginMock implements Ilogin {
    public async perform (auth: LoginEmployerControllerProps): Promise<string> {
      return 'autorized'
    }
  }
  return new LoginMock()
}
