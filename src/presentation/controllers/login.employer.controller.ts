import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type Ilogin } from '../../data/protocols/login.employer.protocol'
import { ExpectedError } from '../helpers/expected.error'
import { ok, serverError, unauthorized } from '../helpers/http.helper'

export interface Iauth {
  email: string
  password: string
}

export class LoginEmployerController implements Controller <Iauth> {
  constructor (private readonly login: Ilogin) {}

  public async handle (auth: Iauth): Promise<HttpResponse> {
    try {
      const res = await this.login.perform(auth)
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
