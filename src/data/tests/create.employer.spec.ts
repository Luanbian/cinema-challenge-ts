import { type EmployerDto, type IcreateEmployer } from '../protocols/create.employer.protocol'
import { type IsaveEmployers } from '../../infra/protocols/save.employers.protocols'
import { makeSaveEmployerStub } from '../../infra/mocks/save.employer.mock'
import { CreateEmployer } from '../usecases/create.employer'
import { type Encrypter } from '../criptography/protocol/encrypter.protocol'
import { Roles } from '../../domain/enums/roles.enum'
import { makeEncrypterStub } from '../mocks/encrypter.mock'

interface SutProps {
  sut: IcreateEmployer
  repositoryStub: IsaveEmployers
  encrypterStub: Encrypter
}

const makeSut = (): SutProps => {
  const repositoryStub = makeSaveEmployerStub()
  const encrypterStub = makeEncrypterStub()
  const sut = new CreateEmployer(repositoryStub, encrypterStub)
  return { sut, repositoryStub, encrypterStub }
}

describe('CreateEmployer', () => {
  test('should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const props: EmployerDto = {
      id: 'valid_test_id',
      name: 'employer_name',
      email: 'employer@email',
      password: '1234',
      role: Roles.CADASTRER
    }
    await sut.perform(props)
    expect(encryptSpy).toHaveBeenCalledWith('1234')
  })
  test('should return a employer entity hashed password', async () => {
    const { sut } = makeSut()
    const props: EmployerDto = {
      id: 'valid_test_id',
      name: 'employer_name',
      email: 'employer@email',
      password: '1234',
      role: Roles.CADASTRER
    }
    const employer = await sut.perform(props)
    expect(employer).toEqual({
      id: 'valid_test_id',
      name: 'employer_name',
      email: 'employer@email',
      password: 'hashed_password',
      role: Roles.CADASTRER
    })
  })
  test('should return a employer entity hashed password even id not passed', async () => {
    const { sut } = makeSut()
    const props: EmployerDto = {
      id: undefined,
      name: 'employer_name',
      email: 'employer@email',
      password: '1234',
      role: Roles.CADASTRER
    }
    const employer = await sut.perform(props)
    expect(employer).toEqual({
      id: employer.id,
      name: 'employer_name',
      email: 'employer@email',
      password: 'hashed_password',
      role: Roles.CADASTRER
    })
  })
  test('should call repository with correct values', async () => {
    const { sut, repositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(repositoryStub, 'save')
    const props: EmployerDto = {
      id: 'valid_test_id',
      name: 'employer_name',
      email: 'employer@email',
      password: '1234',
      role: Roles.CADASTRER
    }
    const employer = await sut.perform(props)
    expect(repositorySpy).toHaveBeenCalledWith(employer)
  })
})
