import { type Employer } from '../../domain/entities/employer'
import { type IfindUserByAuth } from '../../infra/protocols/find.user.by.auth.protocol'
import { type IupdatePassword } from '../../infra/protocols/update.password.protocol'
import { ExpectedError } from '../../presentation/helpers/expected.error'
import { type Encrypter } from '../criptography/protocol/encrypter.protocol'
import { type IredefinePassword, type IredefinePasswordProps } from '../protocols/redefine.password.protocol'

export class RedefinePassword implements IredefinePassword {
  constructor (
    private readonly user: IfindUserByAuth,
    private readonly encrypter: Encrypter,
    private readonly password: IupdatePassword
  ) {}

  public async perform (paramns: IredefinePasswordProps): Promise<string> {
    const user = await this.findUserByEmail(paramns.email)
    await this.veirfyProvidedToken(user.passwordToken, paramns.token)
    await this.verifyTokenIsExpires(user.passwordTokenExpires)
    const hashedPassword = await this.encrypter.encrypt(paramns.newPassword)
    await this.password.alterPass(user.id, hashedPassword)
    return 'password redefined'
  }

  private async findUserByEmail (email: string): Promise<Employer> {
    const user = await this.user.findUserByAuth(email)
    if (user === null) throw new ExpectedError('usuário não encontrado')
    else return user
  }

  private async veirfyProvidedToken (userToken: string, providedToken: string): Promise<void> {
    if (userToken !== providedToken) {
      throw new ExpectedError('token inválido')
    }
  }

  private async verifyTokenIsExpires (userTokenExpiresAt: Date): Promise<void> {
    const now = new Date()
    now.setHours(now.getHours())
    if (userTokenExpiresAt < now) {
      throw new ExpectedError('token expirado')
    }
  }
}
