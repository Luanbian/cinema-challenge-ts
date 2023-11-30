import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type Iauth } from '../../presentation/controllers/login.employer.controller'
import { type Ilogin } from '../protocols/login.employer.protocol'

export class LoginEmployer implements Ilogin {
  constructor (private readonly repository: IfindUserByAuth) {}

  public async perform (auth: Iauth): Promise<string | null> {
    const user = await this.repository.findUserByAuth(auth)
    if (user === null) return null
    else return 'token'
  }
}
