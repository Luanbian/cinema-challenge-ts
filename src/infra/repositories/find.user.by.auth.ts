import { type Employer } from '../../domain/entities/employer'
import { type IfindUserByAuth } from '../protocols/find.user.by.auth.protocol'
import prisma from '../prisma'

export class FindUserByAuth implements IfindUserByAuth {
  public async findUserByAuth (email: string): Promise<Employer | null> {
    const user = await prisma.employers.findFirst({
      where: { email }
    })
    return user
  }
}
