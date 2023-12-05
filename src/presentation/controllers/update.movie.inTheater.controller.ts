import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IupdateMovieInTheater } from '../../data/protocols/update.movie.inTheater.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { makeLog } from '../../main/factories/adapter.factory'
import { notFound, ok, serverError, unauthorized } from '../helpers/http.helper'

export interface UpdateMovieInTheaterControllerProps {
  id: string
  loggedUser: { role?: Roles }
}

export class UpdateMovieInTheaterController implements Controller<UpdateMovieInTheaterControllerProps> {
  constructor (private readonly update: IupdateMovieInTheater) {}

  public async handle (paramns: UpdateMovieInTheaterControllerProps): Promise<HttpResponse> {
    try {
      const permitedRoles = ['admin', 'manager']
      if (typeof paramns.loggedUser.role === 'undefined' ||
        !permitedRoles.includes(paramns.loggedUser.role.toLowerCase().trim())) {
        await makeLog().execute('warn', 'user try update movie in theater without access', { user: { logged: paramns.loggedUser } })
        return unauthorized('Você não tem permissão para acessar essa rota')
      }
      const res = await this.update.perform(paramns.id)
      if (res === null) {
        await makeLog().execute('warn', 'user try update movie in theater that doesnt exist', { loggedUser: paramns.loggedUser })
        return notFound('id not found')
      }
      await makeLog().execute('info', 'movie in theater updated', { loggedUser: paramns.loggedUser, updatedMovie: res.after })
      return ok(res)
    } catch (error) {
      await makeLog().execute('crit', 'server error', 'update movie in theater controller throws', new Error(error))
      return serverError(error)
    }
  }
}
