import { Roles } from '../../domain/entities/employer'
import { type EmployerDto, type IcreateEmployer } from '../protocols/create.employer.protocol'
import { type IsaveEmployers } from '../../infra/protocols/save.employers.protocols'
import { makeSaveEmployerStub } from '../../infra/mocks/save.employer.mock'
import { CreateEmployer } from '../usecases/create.employer'

interface SutProps {
  sut: IcreateEmployer
  repositoryStub: IsaveEmployers
}

const makeSut = (): SutProps => {
  const repositoryStub = makeSaveEmployerStub()
  const sut = new CreateEmployer(repositoryStub)
  return { sut, repositoryStub }
}

describe('CreateEmployer', () => {
  test('should return a employer entity', async () => {
    const { sut } = makeSut()
    const props: EmployerDto = {
      name: 'employer_name',
      email: 'employer@email',
      password: '****',
      role: Roles.CADASTRER
    }
    const employer = await sut.perform(props)
    expect(employer).toEqual({
      id: employer.id,
      name: 'employer_name',
      email: 'employer@email',
      password: '****',
      role: Roles.CADASTRER
    })
  })
})
