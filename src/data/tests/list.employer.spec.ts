import { Roles } from '@prisma/client'
import { type IfindAllEmployers } from '../../infra/protocols/find.all.employers.protocols'
import { type IlistEmployer } from '../protocols/list.employer.protocol'
import { ListEmployer } from '../usecases/list.employer'
import { makeFindAllEmployersStub } from '../../infra/mocks/find.all.employers.mock'

interface SutProps {
  sut: IlistEmployer
  repository: IfindAllEmployers
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
