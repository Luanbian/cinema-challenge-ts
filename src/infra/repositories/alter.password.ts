import prisma from '../prisma'
import { type IupdatePassword } from '../protocols/update.password.protocol'

export class UpdatePassword implements IupdatePassword {
  public async alterPass (id: string, newPass: string): Promise<void> {
    await prisma.employers.update({
      data: {
        password: newPass
      },
      where: { id }
    })
  }
}
