import { type Employer } from '../../domain/entities/employer'
import { type Iauth } from '../../presentation/controllers/login.employer.controller'
import { type IfindUserByAuth } from '../protocols/find.user.by.auth.protocol'
import prisma from '../prisma'

export class FindUserByAuth implements IfindUserByAuth {
  public async findUserByAuth (auth: Iauth): Promise<Employer | null> {
    const user = await prisma.employers.findFirst({
      where: {
        email: auth.email,
        password: auth.password
      }
    })
    return user
  }
}
