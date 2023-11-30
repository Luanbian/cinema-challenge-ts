interface SutTypes {
  sut: LoginEmployerController
}

export interface Iauth {
  email: string
  password: string
}

export interface Ilogin {
  perform: (auth: Iauth) => Promise<string | null>
}

export const makeLoginMock = (): Ilogin => {
  class LoginMock implements Ilogin {
    public async perform (auth: Iauth): Promise<string | null> {
      return 'autorized'
    }
  }
  return new LoginMock()
}

export class LoginEmployerController {
  constructor (private readonly login: Ilogin) {}

  public async handle (auth: Iauth): Promise<{ statusCode: number, body: any }> {
    try {
      const res = await this.login.perform(auth)
      return {
        statusCode: 200,
        body: res
      }
    } catch (error) {
      return {
        statusCode: 401,
        body: 'Unauthorized'
      }
    }
  }
}

const makeSut = (): SutTypes => {
  const login = makeLoginMock()
  const sut = new LoginEmployerController(login)
  return { sut }
}

describe('LoginEmployerController', () => {
  test('should', async () => {
    //
  })
})
