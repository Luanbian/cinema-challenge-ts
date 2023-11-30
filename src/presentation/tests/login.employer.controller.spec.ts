interface SutTypes {
  sut: LoginEmployerController
  login: Ilogin
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
  return { sut, login }
}

describe('LoginEmployerController', () => {
  test('should call usecase with correct values', async () => {
    const { sut, login } = makeSut()
    const loginSpy = jest.spyOn(login, 'perform')
    const auth: Iauth = {
      email: 'teste.email@gmail.com',
      password: '1234'
    }
    await sut.handle(auth)
    expect(loginSpy).toHaveBeenCalledWith(auth)
  })
})
