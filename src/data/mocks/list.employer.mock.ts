import { type IlistEmployer } from '../protocols/list.employer.protocol'
import { type Employer, Roles } from '../../domain/entities/employer'

export const makeListEmployerMock = (): IlistEmployer => {
  class ListEmployerMock implements IlistEmployer {
    public async perform (): Promise<{ result: Employer[], length: number }> {
      return {
        result: [{
          id: 'test_id',
          name: 'test_name',
          email: 'test_email@gmail.com',
          password: 'test_password',
          role: Roles.ADMIN
        }, {
          id: 'test_id',
          name: 'test_name',
          email: 'test_email@gmail.com',
          password: 'test_password',
          role: Roles.ADMIN
        }],
        length: 2
      }
    }
  }
  return new ListEmployerMock()
}
