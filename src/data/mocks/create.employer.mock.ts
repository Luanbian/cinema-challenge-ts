import { type Employer } from '../../domain/entities/employer'
import { Roles } from '../../domain/enums/roles.enum'
import { type EmployerDto, type IcreateEmployer } from '../protocols/create.employer.protocol'

export const makeCreateEmployerMock = (): IcreateEmployer => {
  class CreateEmployerMock implements IcreateEmployer {
    public async perform (props: EmployerDto): Promise<Employer> {
      return {
        id: 'employer_id_test',
        name: 'employer_name_test',
        email: 'employer_email_test',
        password: 'employer_pass_test',
        passwordToken: 'valid_password_token',
        passwordTokenExpires: new Date('01/11/2023'),
        role: Roles.ADMIN
      }
    }
  }
  return new CreateEmployerMock()
}
