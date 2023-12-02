import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type IupdateMovieInTheater } from '../../data/protocols/update.movie.inTheater.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
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
        return unauthorized('Você não tem permissão para acessar essa rota')
      }
      const res = await this.update.perform(paramns.id)
      if (res === null) return notFound('id not found')
      return ok(res)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
