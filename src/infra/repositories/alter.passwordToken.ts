import prisma from '../prisma'
import { type IupdatePasswordToken, type IupdatePasswordTokenProps } from '../protocols/update.passwordToken.protocol'

export class UpdatePasswordToken implements IupdatePasswordToken {
  public async alterPassToken (paramns: IupdatePasswordTokenProps): Promise<void> {
    await prisma.employers.update({
      data: {
        passwordToken: paramns.token,
        passwordTokenExpires: paramns.expiresAt
      },
      where: {
        id: paramns.id
      }
    })
  }
}
