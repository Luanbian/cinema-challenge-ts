import { type Employer } from '../../domain/entities/employer'
import { type Iauth } from '../../presentation/controllers/login.employer.controller'
import { type IfindUserByAuth } from '../protocols/find.user.by.auth.protocol'

export const makeFindUserByAuthStub = (): IfindUserByAuth => {
  class FindUserByAuth implements IfindUserByAuth {
    public async findUserByAuth (auth: Iauth): Promise<Employer | null> {
      return {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: '1#24%$6',
        role: 'CONSULTER'
      }
    }
  }
  return new FindUserByAuth()
}
