import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type Iauth } from '../../presentation/controllers/login.employer.controller'
import { type Encrypter } from '../protocols/encrypter.protocol'
import { type Ilogin } from '../protocols/login.employer.protocol'

export class LoginEmployer implements Ilogin {
  constructor (
    private readonly repository: IfindUserByAuth,
    private readonly encrypter: Encrypter
  ) {}

  public async perform (auth: Iauth): Promise<string | null> {
    const user = await this.repository.findUserByAuth(auth.email)
    if (user === null) return null
    const checkPassword = await this.encrypter.matchPassword(auth.password, user.password)
    if (checkPassword) {
      return 'logado'
    } else {
      return 'senha incorreta'
    }
  }
}
