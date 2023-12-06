import { randomUUID } from 'crypto'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type IPasswordToken } from '../protocols/forgot.password.protocol'
import { ExpectedError } from '../../presentation/helpers/expected.error'
import { type Employer } from '../../domain/entities/employer'

export class PasswordToken implements IPasswordToken {
  constructor (
    private readonly repository: IfindUserByAuth
  ) {}

  public async perform (email: string): Promise<string> {
    await this.findUserByEmail(email)
    const token = randomUUID()
    return token
  }

  private async findUserByEmail (email: string): Promise<Employer> {
    const user = await this.repository.findUserByAuth(email)
    if (user === null) throw new ExpectedError('usuário não encontrado')
    else return user
  }
}
