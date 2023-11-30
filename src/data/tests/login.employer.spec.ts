import { type Employer } from '../../domain/entities/employer'
import { type Iauth } from '../../presentation/controllers/login.employer.controller'
import { type Ilogin } from '../protocols/login.employer.protocol'

interface SutTypes {
  repository: IfindUserByAuth
  sut: Ilogin
}

export interface IfindUserByAuth {
  findUserByAuth: (auth: Iauth) => Promise<Employer | null>
}

export const makeFindUserByAuthStub = (): IfindUserByAuth => {
  class FindUserByAuth implements IfindUserByAuth {
    public async findUserByAuth (auth: Iauth): Promise<Employer | null> {
      return {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: '1#24%$6',
        role: 'CONSULTER'
      }
    }
  }
  return new FindUserByAuth()
}

export class LoginEmployer implements Ilogin {
  constructor (private readonly repository: IfindUserByAuth) {}

  public async perform (auth: Iauth): Promise<string | null> {
    const user = await this.repository.findUserByAuth(auth)
    if (user === null) return null
    else return 'token'
  }
}

const makeSut = (): SutTypes => {
  const repository = makeFindUserByAuthStub()
  const sut = new LoginEmployer(repository)
  return { sut, repository }
}

describe('LoginEmployer', () => {
  test('should', async () => {
    //
  })
})
