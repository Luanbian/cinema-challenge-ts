import { type IlistEmployer } from '../protocols/list.employer.protocol'
import { type Employer } from '../../domain/entities/employer'
import { Roles } from '../../domain/enums/roles.enum'

export const makeListEmployerMock = (): IlistEmployer => {
  class ListEmployerMock implements IlistEmployer {
    public async perform (): Promise<{ result: Employer[], length: number }> {
      return {
        result: [{
          id: 'test_id',
          name: 'test_name',
          email: 'test_email@gmail.com',
          password: 'test_password',
          passwordToken: 'valid_password_token',
          passwordTokenExpires: new Date('01/11/2023'),
          role: Roles.ADMIN
        }, {
          id: 'test_id',
          name: 'test_name',
          email: 'test_email@gmail.com',
          password: 'test_password',
          passwordToken: 'valid_password_token',
          passwordTokenExpires: new Date('01/11/2023'),
          role: Roles.ADMIN
        }],
        length: 2
      }
    }
  }
  return new ListEmployerMock()
}
