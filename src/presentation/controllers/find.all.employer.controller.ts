import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IlistEmployer } from '../../data/protocols/list.employer.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { makeLog } from '../../main/factories/adapter.factory'
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
        await makeLog().execute('warn', 'user try list employers without access', { user: { logged: paramns.loggedUser } })
        return unauthorized('Você não tem permissão para acessar essa rota')
      }
      const res = await this.list.perform()
      if (res.length === 0) {
        await makeLog().execute('info', 'employers listed with no content', { loggedUser: paramns.loggedUser })
        return noContent()
      }
      const body = {
        length: res.length,
        content: res.result
      }
      await makeLog().execute('info', 'employers listed', { loggedUser: paramns.loggedUser })
      return ok(body)
    } catch (error) {
      await makeLog().execute('crit', 'server error', 'list employers controller throws', new Error(error))
      return serverError(error)
    }
  }
}
