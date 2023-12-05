import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type EmployerDto, type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { makeLog } from '../../main/factories/adapter.factory'
import { created, serverError, unauthorized } from '../helpers/http.helper'

export interface AddEmployerControllerProps extends EmployerDto {
  loggedUser: { role?: Roles }
}

export class AddEmployerController implements Controller<AddEmployerControllerProps> {
  constructor (private readonly create: IcreateEmployer) {}

  public async handle (paramns: AddEmployerControllerProps): Promise<HttpResponse> {
    try {
      const permitedRoles = ['admin', 'cadastrer']
      if (typeof paramns.loggedUser.role === 'undefined' ||
        !permitedRoles.includes(paramns.loggedUser.role.toLowerCase().trim())) {
        await makeLog().execute('warn', 'user try create a new employer without access', { user: { logged: paramns.loggedUser } })
        return unauthorized('Você não tem permissão para acessar essa rota')
      }
      const employerDto: EmployerDto = {
        id: paramns.id,
        name: paramns.name,
        email: paramns.email,
        password: paramns.password,
        role: paramns.role
      }
      const res = await this.create.perform(employerDto)
      await makeLog().execute('info', 'new employer created', { loggedUser: paramns.loggedUser, employerCreated: res })
      return created(res)
    } catch (error) {
      await makeLog().execute('crit', 'server error', 'add employer controller throws', new Error(error))
      return serverError(error)
    }
  }
}
