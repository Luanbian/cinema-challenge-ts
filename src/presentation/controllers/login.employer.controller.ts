import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type Iauth, type Ilogin } from '../../data/protocols/login.employer.protocol'
import { makeLog } from '../../main/factories/adapter.factory'
import { ok, serverError } from '../helpers/http.helper'

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
      await makeLog().execute('info', 'user logged', { user: { email: auth.email } })
      return ok(res)
    } catch (error) {
      await makeLog().execute('crit', 'server error', 'login controller throws', new Error(error))
      return serverError(error)
    }
  }
}
