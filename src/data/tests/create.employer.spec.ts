import { Roles } from '../../domain/entities/employer'
import { type EmployerDto, type IcreateEmployer } from '../protocols/create.employer.protocol'
import { type IsaveEmployers } from '../../infra/protocols/save.employers.protocols'
import { makeSaveEmployerStub } from '../../infra/mocks/save.employer.mock'
import { CreateEmployer } from '../usecases/create.employer'
import { type Encrypter } from '../protocols/encrypter.protocol'

interface SutProps {
  sut: IcreateEmployer
  repositoryStub: IsaveEmployers
  encrypterStub: Encrypter
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    public async encrypt (value: string): Promise<string> {
      return await new Promise((resolve, reject) => {
        resolve('hashed_password')
      })
    }
  }
  return new EncrypterStub()
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
})
