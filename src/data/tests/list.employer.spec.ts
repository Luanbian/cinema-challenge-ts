import { Roles } from '@prisma/client'
import { type IfindAllEmployers } from '../../infra/protocols/find.all.employers.protocols'
import { type IlistEmployer } from '../protocols/list.employer.protocol'
import { ListEmployer } from '../usecases/list.employer'
import { makeFindAllEmployersStub } from '../../infra/mocks/find.all.employers.mock'

interface SutProps {
  sut: IlistEmployer
  repositoryStub: IfindAllEmployers
}

const makeSut = (): SutProps => {
  const repositoryStub = makeFindAllEmployersStub()
  const sut = new ListEmployer(repositoryStub)
  return { sut, repositoryStub }
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
      passwordToken: 'valid_password_token',
      passwordTokenExpires: new Date('01/11/2023'),
      role: Roles.ADMIN
    }, {
      id: 'id_test',
      name: 'name_test',
      email: 'email_test@gmail.com',
      password: 'passowrd_test',
      passwordToken: 'valid_password_token',
      passwordTokenExpires: new Date('01/11/2023'),
      role: Roles.ADMIN
    }])
    expect(employers.length).toBe(employers.result.length)
  })
  test('should call repository', async () => {
    const { sut, repositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(repositoryStub, 'findAll')
    await sut.perform()
    expect(repositorySpy).toHaveBeenCalled()
  })
})
