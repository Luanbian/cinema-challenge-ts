import { type Controller } from '../../@types/controller'
import { type HttpResponse } from '../../@types/http'
import { type movieDto, type IcreateMovie } from '../../data/protocols/create.movie.protocol'
import { type Roles } from '../../domain/enums/roles.enum'
import { makeLog } from '../../main/factories/adapter.factory'
import { created, serverError, unauthorized } from '../helpers/http.helper'

export interface AddMovieControllerProps extends movieDto {
  loggedUser: { role?: Roles }
}

export class AddMovieController implements Controller<AddMovieControllerProps> {
  constructor (private readonly create: IcreateMovie) {}

  public async handle (paramns: AddMovieControllerProps): Promise<HttpResponse> {
    try {
      const permitedRoles = ['admin', 'cadastrer']
      if (typeof paramns.loggedUser.role === 'undefined' ||
        !permitedRoles.includes(paramns.loggedUser.role.toLowerCase().trim())) {
        await makeLog().execute('warn', 'user try create a new movie without access', { user: { logged: paramns.loggedUser } })
        return unauthorized('Você não tem permissão para acessar essa rota')
      }
      const movieDto: movieDto = {
        id: paramns.id,
        name: paramns.name,
        synopsis: paramns.synopsis,
        inTheaters: paramns.inTheaters,
        releaseDate: paramns.releaseDate
      }
      const res = await this.create.perform(movieDto)
      await makeLog().execute('info', 'new movie created', { loggedUser: paramns.loggedUser, movieCreated: res })
      return created(res)
    } catch (error) {
      await makeLog().execute('crit', 'server error', 'add movie controller throws', new Error(error))
      return serverError(error)
    }
  }
}
