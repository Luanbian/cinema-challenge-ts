import { randomUUID } from 'crypto'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type IPasswordToken } from '../protocols/forgot.password.protocol'
import { ExpectedError } from '../../presentation/helpers/expected.error'
import { type Employer } from '../../domain/entities/employer'

export class PasswordToken implements IPasswordToken {
  constructor (
    private readonly repository: IfindUserByAuth
  ) {}

  public async perform (email: string): Promise<{ token: string, expiresAt: Date }> {
    await this.findUserByEmail(email)
    const { token, expiresAt } = this.generatePasswordToken()
    return { token, expiresAt }
  }

  private async findUserByEmail (email: string): Promise<Employer> {
    const user = await this.repository.findUserByAuth(email)
    if (user === null) throw new ExpectedError('usuário não encontrado')
    else return user
  }

  private generatePasswordToken (): { token: string, expiresAt: Date } {
    const token = randomUUID()
    const now = new Date()
    now.setHours(now.getHours() + 1)
    return { token, expiresAt: now }
  }
}
