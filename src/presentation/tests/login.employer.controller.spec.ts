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
      if (res === null) {
        return {
          statusCode: 401,
          body: 'unauthorized'
        }
      }
      return {
        statusCode: 200,
        body: res
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'server error'
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
      email: 'valid_email',
      password: '1234'
    }
    await sut.handle(auth)
    expect(loginSpy).toHaveBeenCalledWith(auth)
  })
  test('should return status code 200 if user autorized with success', async () => {
    const { sut } = makeSut()
    const auth: Iauth = {
      email: 'valid_email',
      password: '1234'
    }
    const httpResponse = await sut.handle(auth)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('autorized')
  })
  test('should return status code 401 if user not autorized', async () => {
    const { sut, login } = makeSut()
    jest.spyOn(login, 'perform').mockImplementationOnce(async () => {
      return null
    })
    const auth: Iauth = {
      email: 'invalid_email',
      password: '1234'
    }
    const httpResponse = await sut.handle(auth)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBe('unauthorized')
  })
})
