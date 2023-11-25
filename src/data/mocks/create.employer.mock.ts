import { type Employer, Roles } from '../../domain/entities/employer'
import { type EmployerDto, type IcreateEmployer } from '../protocols/create.employer.protocol'

export const makeCreateEmployerMock = (): IcreateEmployer => {
  class CreateEmployerMock implements IcreateEmployer {
    public async perform (props: EmployerDto): Promise<Employer> {
      return {
        id: 'employer_id_test',
        name: 'employer_name_test',
        email: 'employer_email_test',
        password: 'employer_pass_test',
        role: Roles.ADMIN
      }
    }
  }
  return new CreateEmployerMock()
}
