import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type Iauth, type Ilogin } from '../../data/protocols/login.employer.protocol'
import { makeLog } from '../../main/factories/adapter.factory'
import { ExpectedError } from '../helpers/expected.error'
import { ok, serverError, unauthorized } from '../helpers/http.helper'

export interface LoginEmployerControllerProps {
  email: string
  password: string
}

export class LoginEmployerController implements Controller <LoginEmployerControllerProps> {
  constructor (private readonly login: Ilogin) {}

  public async handle (paramns: LoginEmployerControllerProps): Promise<HttpResponse> {
    try {
      const auth: Iauth = {
        email: paramns.email,
        password: paramns.password
      }
      const res = await this.login.perform(auth)
      await makeLog().execute('info', 'testando')
      return ok(res)
    } catch (error) {
      if (error instanceof ExpectedError) {
        return unauthorized(error.message)
      }
      console.error(error)
      return serverError(error)
    }
  }
}
