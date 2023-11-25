import { type EmployerDto, type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { Roles, type Employer } from '../../domain/entities/employer'
import { AddEmployerController } from '../controllers/add.employer.controller'

interface SutProps {
  sut: AddEmployerController
  create: IcreateEmployer
}
const makeCreateEmployerMock = (): IcreateEmployer => {
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

const makeSut = (): SutProps => {
  const create = makeCreateEmployerMock()
  const sut = new AddEmployerController()
  return { sut, create }
}
describe('AddEmployerController', () => {
  test('should return status code 201 and employer entity if success', async () => {

  })
})
