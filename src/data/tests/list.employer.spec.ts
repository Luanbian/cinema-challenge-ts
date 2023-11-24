import { type $Enums, Roles } from '@prisma/client'
import { type IfindAllEmployers } from '../../infra/protocols/find.all.employers.protocols'
import { type IlistEmployer } from '../protocols/list.employer.protocol'
import { ListEmployer } from '../usecases/list.employer'

interface SutProps {
  sut: IlistEmployer
  repository: IfindAllEmployers
}

const makeFindAllEmployersStub = (): IfindAllEmployers => {
  class FindAllEmployersStub implements IfindAllEmployers {
    public async findAll (): Promise<{
      result: Array<{
        id: string
        name: string
        email: string
        password: string
        role: $Enums.Roles
      }>
      length: number
    }> {
      return {
        result: [{
          id: 'id_test',
          name: 'name_test',
          email: 'email_test@gmail.com',
          password: 'passowrd_test',
          role: Roles.ADMIN
        }, {
          id: 'id_test',
          name: 'name_test',
          email: 'email_test@gmail.com',
          password: 'passowrd_test',
          role: Roles.ADMIN
        }],
        length: 2
      }
    }
  }
  return new FindAllEmployersStub()
}

const makeSut = (): SutProps => {
  const repository = makeFindAllEmployersStub()
  const sut = new ListEmployer(repository)
  return { sut, repository }
}
describe('ListEmployer', () => {
  test('should list employers', async () => {
    const { sut } = makeSut()
    const employers = await sut.perform()
    expect(employers.result).toEqual([{
      id: 'id_test',
      name: 'name_test',
      email: 'email_test@gmail.com',
      password: 'passowrd_test',
      role: Roles.ADMIN
    }, {
      id: 'id_test',
      name: 'name_test',
      email: 'email_test@gmail.com',
      password: 'passowrd_test',
      role: Roles.ADMIN
    }])
    expect(employers.length).toBe(employers.result.length)
  })
})
