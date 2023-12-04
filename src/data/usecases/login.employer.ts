import { type Employer } from '../../domain/entities/employer'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { ExpectedError } from '../../presentation/helpers/expected.error'
import { type Authenticate } from '../../middleware/auth/protocol/authenticate.protocol'
import { type Encrypter } from '../criptography/protocol/encrypter.protocol'
import { type Iauth, type Ilogin } from '../protocols/login.employer.protocol'

export class LoginEmployer implements Ilogin {
  constructor (
    private readonly repository: IfindUserByAuth,
    private readonly encrypter: Encrypter,
    private readonly auth: Authenticate
  ) {}

  public async perform (auth: Iauth): Promise<string> {
    const user = await this.findUserByEmail(auth.email)
    await this.checkPassword(auth.password, user.password)
    const token = await this.auth.generateToken(user)
    return token
  }

  private async findUserByEmail (email: string): Promise<Employer> {
    const user = await this.repository.findUserByAuth(email)
    if (user === null) throw new ExpectedError('usuário não encontrado')
    else return user
  }

  private async checkPassword (password: string, hashPassword: string): Promise<void> {
    const check = await this.encrypter.matchPassword(password, hashPassword)
    if (!check) throw new ExpectedError('senha incorreta')
  }
}
