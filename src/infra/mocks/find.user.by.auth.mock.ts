import { type Employer } from '../../domain/entities/employer'
import { type IfindUserByAuth } from '../protocols/find.user.by.auth.protocol'

export const makeFindUserByAuthStub = (): IfindUserByAuth => {
  class FindUserByAuth implements IfindUserByAuth {
    public async findUserByAuth (email: string): Promise<Employer | null> {
      return {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: '1#24%$6',
        role: 'CONSULTER',
        passwordToken: 'valid_password_token',
        passwordTokenExpires: new Date()
      }
    }
  }
  return new FindUserByAuth()
}
