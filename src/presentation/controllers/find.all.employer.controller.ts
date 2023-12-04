import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IlistEmployer } from '../../data/protocols/list.employer.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { noContent, ok, serverError, unauthorized } from '../helpers/http.helper'

export interface FindAllEmployerControllerProps {
  loggedUser: {
    role?: Roles
  }
}

export class FindAllEmployerController implements Controller<FindAllEmployerControllerProps> {
  constructor (private readonly list: IlistEmployer) {}

  public async handle (paramns: FindAllEmployerControllerProps): Promise<HttpResponse> {
    try {
      const permitedRoles = ['admin', 'consulter']
      if (typeof paramns.loggedUser.role === 'undefined' ||
        !permitedRoles.includes(paramns.loggedUser.role.toLowerCase().trim())) {
        return unauthorized('Você não tem permissão para acessar essa rota')
      }
      const res = await this.list.perform()
      if (res.length === 0) return noContent()
      const body = {
        length: res.length,
        content: res.result
      }
      return ok(body)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
